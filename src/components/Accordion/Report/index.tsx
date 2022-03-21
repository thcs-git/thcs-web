import React, {useState} from "react";
// aplication
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

// icons
import IconMeasurement from "../../Icons/measurement";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import BloodGlucose from "../../Icons/BloodGlucose";
import BodilySurface from "../../Icons/BodilySurface";
import Exam from "../../Icons/Exam";
import Frequency from "../../Icons/Frequency";
import Height from "../../Icons/Height";
import Lung from "../../Icons/Lung";
import Presure from "../../Icons/Presure";
import Saturation from "../../Icons/Saturation";
import Temperature from "../../Icons/Temperature";
import Weight from "../../Icons/Weight";
import Pain from "../../Icons/Pain";
import Allergy from "../../Icons/allergic";
import Evolution from "../../Icons/Evolution";
import Check from "../../Icons/Check";
// styled components and style
import {
    AccordionStyled as Accordion,
    AccordionDetailsStyled as AccordionDetails,
    AccordionSummaryStyled as AccordionSummary,
    HeaderDetailsAccordion,
    ContentDetailsAccordion,
    TextCenterDetails,
    ContainerStyled as Container,
} from "./style";

// Helps
import {formatDate} from "../../../helpers/date";
import {toast} from "react-toastify";
import _ from "lodash";
// components
import Loading from "../../Loading";
// types
import {
    AllergiesInterface,
    AllergiesItem,
} from "../../../store/ducks/allergies/types";
import {IconButton} from "@mui/material";
import {loadCheckinFilterRequest, loadCheckinReportRequest} from "../../../store/ducks/cares/actions";
import {useDispatch, useSelector} from "react-redux";
import {CareState} from "../../../store/ducks/cares/types";
import {ApplicationState} from "../../../store";

interface IAccordionReport {
    content: {
        loading: boolean;
        error: boolean;
        data: any;
    };
    company_id: string;
    reportType: string;
    allergic?: boolean;
    state?: any;
    // data: IDataAccordion[];
}

interface IDataAccordion {
    _id: string; // data
    list: IAccordionInfo[];
}

interface IAccordionInfo {
    _id: string;
    attendance_id: string;
    canceled: boolean;
    company_id: string;
    created_at: string;
    created_by: [
        {
            _id: string;
            companies_links: [
                {
                    _id: string;
                    active: boolean;
                    companie_id: string;
                    customer_id: string;
                    exp: string;
                    function: string;
                    id_integration: string;
                    linked_at: string;
                }
            ];
            name: string;
        }
    ];
    itens: IAccordionItem[];
    patient_id: string;
}

interface IAccordionItem {
    _id: string;
    name: string;
    reference: any; //tipar depois
    type: string;
    unit_id: any; //tipar depois
    value: string;
}

export default function AccordionReport(props: IAccordionReport) {
    const {content, company_id, reportType, state} = props;
    const dispatch = useDispatch();
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

    const [expanded, setExpanded] = useState<string | false>("panel0");
    const measurementsItemObjectIdMD = [
        {
            _id: "62026db535284c714701a9ac",
            name: "Pressão Arterial Diastólica",
        },
        {
            _id: "5f7f796167a82d0e01571c42",
            name: "Frequência Respiratória",
        },
        {
            _id: "5f7f78fc67a82d0e01571c40",
            name: "Frequência Cardíaca",
        },
        {
            _id: "5f7f773567a82d0e01571c3d",
            name: "Superfícia Corporal",
        },
        {
            _id: "5f7f772567a82d0e01571c3b",
            name: "Índice de Massa Corporal",
        },
        {
            _id: "5f7f771f67a82d0e01571c39",
            name: "Altura",
        },
        {
            _id: "5f7f771b67a82d0e01571c37",
            name: "Peso",
        },
        {
            _id: "5f7f768067a82d0e01571c35",
            name: "Hemoglico Teste",
        },
        {
            _id: "5f20a77811ebd813183e6a03",
            name: "Dor",
        },
        {
            _id: "5f20a76a11ebd813183e6a01",
            name: "SpO2",
        },
        {
            _id: "5f20a74011ebd813183e69ff",
            name: "Pressão Arterial Sistólica",
        },
        {
            _id: "5f1f660a8590e0d2df9ad113",
            name: "Temperatura",
        },
    ];
    // console.log(content.data, "DATAAA");

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const capitalizeText = (words: string) => {
        return words
            .toLowerCase()
            .split(" ")
            .map((text: string) => {
                return (text = text.charAt(0).toUpperCase() + text.substring(1));
            })
            .join(" ");
    };

    const getFirstAndLastName = (fullName: string) => {
        return `${fullName.split(" ")[0]} ${
            fullName.split(" ")[fullName.split(" ").length - 1]
        }`;
    };

    const handleFunction = (list: any, company: string, type?: string) => {
        if (type === "allergy" || type === "event") {
            if (!list.created_by?.companies_links || list.created_by === null)
                return "-";
            return list.created_by.companies_links.map((item: any, index: number) => {
                if (item.companie_id === company) {
                    return item.function;
                }
            });
        } else if (reportType === "Check-in/out") {
            return list.map((item: any, index: number) => {
                if (item.companie_id === company) {
                    return item.function;
                }
            });
        } else {
            return list.created_by[0].companies_links.map(
                (item: any, index: number) => {
                    if (item.companie_id === company) {
                        return item.function;
                    }
                }
            );
        }
    };
    const handleMeasurementItemsIcons = (
        measurements: IAccordionItem[],
        canceled: boolean
    ) => {
        return measurements.map(
            (measurementItem: IAccordionItem, index: number) => {
                switch (measurementItem.name) {
                    case "PAD":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Presure
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "Frequência Respiratória":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Lung
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "Frequência Cardíaca":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Frequency
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "Superfície Corpórea":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <BodilySurface
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "IMC":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Exam
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "Altura":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Height
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "Peso":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Weight
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "HGT":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <BloodGlucose
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "Dor":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Pain
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );

                    case "SpO2":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Saturation
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "PAS":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Presure
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                    case "Temperatura":
                        return (
                            <Tooltip title={measurementItem.name}>
                                <Box>
                                    <Temperature
                                        fill={canceled ? "#7D7D7D" : "var(--secondary)"}
                                        width={"20px"}
                                        height={"20px"}
                                    />
                                </Box>
                            </Tooltip>
                        );
                }
            }
        );
    };

    function handleHeaderDetails(type?: any) {
        return (
            <>
                <HeaderDetailsAccordion>
                    {reportType !== "Check-in/out" && (
                        <TextCenterDetails
                            sx={{
                                width: `${
                                    type === "allergy" || type === "event" ? "100px" : "80px"
                                }`,
                            }}
                        >
                            Hora
                        </TextCenterDetails>
                    )}
                    <TextCenterDetails
                        sx={{
                            width: `${
                                type === "allergy" || type === "event" ? "250px" : "200px"
                            }`,
                        }}
                    >
                        Profissional
                    </TextCenterDetails>
                    <TextCenterDetails
                        sx={{
                            width: `${
                                type === "allergy" || type === "event" ? "250px" : "200px"
                            }`,
                        }}
                    >
                        {reportType === "Evolução" ? "Especialidade" : "Função"}
                    </TextCenterDetails>
                    <TextCenterDetails
                        sx={{
                            width: `${
                                type === "allergy" ||
                                type === "event" ||
                                reportType === "Evolução" ||
                                reportType === "Check-in/out"
                                    ? "200px"
                                    : "320px"
                            }`,
                        }}
                    >
                        {type === "allergy"
                            ? "Alergia"
                            : type === "event"
                                ? "Eventos adversos"
                                : reportType === "Evolução"
                                    ? "Tipo Evolução"
                                    : reportType === "Check-in/out"
                                        ? "Entrada"
                                        : "Conteúdo"}
                    </TextCenterDetails>
                    {reportType === "Alergias" ? (
                        ""
                    ) : (
                        <TextCenterDetails
                            sx={{
                                width: `${
                                    reportType === "Evolução" || reportType === "Check-in/out"
                                        ? "200px"
                                        : "100px"
                                }`,
                                justifyContent: `${
                                    reportType === "Evolução" || reportType === "Check-in/out"
                                        ? "center"
                                        : "flex-start"
                                }`,
                            }}
                        >
                            {reportType === "Check-in/out" ? "Saída" : "Opções"}
                        </TextCenterDetails>
                    )}
                </HeaderDetailsAccordion>
                <Divider sx={{width: "100%", margin: "0 auto"}}/>
            </>
        );
    }

    const handleRow = (list: any, type?: string) => {
        if (type) {
            if (type === "allergy") {
                return list.map((column: any, index: number) => {
                    return (
                        <>
                            <ContentDetailsAccordion key={column._id}>
                                <TextCenterDetails sx={{width: "100px"}}>
                                    {formatDate(column.created_at, "DD/MM/YY HH:mm")}
                                </TextCenterDetails>
                                <TextCenterDetails sx={{width: "250px"}}>
                                    {column.created_by
                                        ? integration
                                            ? getFirstAndLastName(capitalizeText(column.created_by))
                                            : getFirstAndLastName(
                                                capitalizeText(column.created_by.name)
                                            )
                                        : "-"}
                                </TextCenterDetails>
                                <TextCenterDetails sx={{width: "250px"}}>
                                    {handleFunction(column, company_id, type)}
                                </TextCenterDetails>
                                <TextCenterDetails sx={{width: "200px"}}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "4px",
                                            margin: "2px",
                                        }}
                                    >
                                        {integration
                                            ? capitalizeText(column.name)
                                            : capitalizeText(column.description)}
                                    </Box>
                                </TextCenterDetails>
                            </ContentDetailsAccordion>
                            {list.length !== index + 1 ? (
                                <Divider sx={{width: "100%", margin: "0 auto"}}/>
                            ) : (
                                ""
                            )}
                        </>
                    );
                });
            } else if (type === "event") {
                return list.map((column: any, index: number) => {
                    return (
                        <>
                            <ContentDetailsAccordion key={column._id}>
                                <TextCenterDetails sx={{width: "100px"}}>
                                    {formatDate(column.created_at, "DD/MM/YY HH:mm")}
                                </TextCenterDetails>
                                <TextCenterDetails sx={{width: "250px"}}>
                                    {column.created_by
                                        ? integration
                                            ? typeof column.created_by === "string"
                                                ? getFirstAndLastName(capitalizeText(column.created_by))
                                                : "-"
                                            : typeof column.created_by === "string"
                                                ? getFirstAndLastName(
                                                    capitalizeText(column.created_by.name)
                                                )
                                                : "-"
                                        : "-"}
                                </TextCenterDetails>
                                <TextCenterDetails sx={{width: "250px"}}>
                                    {handleFunction(column, company_id, type)}
                                </TextCenterDetails>
                                <TextCenterDetails sx={{width: "200px"}}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "4px",
                                            margin: "2px",
                                        }}
                                    >
                                        {capitalizeText(column.event)}
                                    </Box>
                                </TextCenterDetails>
                            </ContentDetailsAccordion>
                            {list.length !== index + 1 ? (
                                <Divider sx={{width: "100%", margin: "0 auto"}}/>
                            ) : (
                                ""
                            )}
                        </>
                    );
                });
            }
        } else if (reportType === "Evolução") {
            return list.map((column: any, index: number) => {
                return (
                    <>
                        <ContentDetailsAccordion key={column._id}>
                            <TextCenterDetails
                                sx={{
                                    width: "80px",
                                    textDecoration: `${column.active ? "none" : "line-through"}`,
                                    color: `${column.active ? "#333333" : "#7D7D7D"}`,
                                }}
                            >
                                {formatDate(column.created_at, "HH:mm")}
                            </TextCenterDetails>
                            <TextCenterDetails
                                sx={{
                                    textDecoration: `${column.active ? "none" : "line-through"}`,
                                    color: `${column.active ? "#333333" : "#7D7D7D"}`,
                                }}
                            >
                                {getFirstAndLastName(capitalizeText(column.created_by[0].name))}
                            </TextCenterDetails>
                            <TextCenterDetails
                                sx={{
                                    textDecoration: `${column.active ? "none" : "line-through"}`,
                                    color: `${column.active ? "#333333" : "#7D7D7D"}`,
                                }}
                            >
                                {column.created_by[0].main_specialty_id[0].name
                                    ? column.created_by[0].main_specialty_id[0].name
                                    : "-"}
                            </TextCenterDetails>
                            <TextCenterDetails
                                sx={{
                                    textDecoration: `${column.active ? "none" : "line-through"}`,
                                    color: `${column.active ? "#333333" : "#7D7D7D"}`,
                                }}
                            >
                                {column.type}
                            </TextCenterDetails>
                            <TextCenterDetails>
                                <DownloadIcon
                                    sx={{color: "var(--secondary)", marginRight: "8px"}}
                                />
                                <PrintIcon sx={{color: "var(--secondary)"}}/>
                            </TextCenterDetails>
                        </ContentDetailsAccordion>
                        {list.length !== index + 1 ? (
                            <Divider sx={{width: "100%", margin: "0 auto"}}/>
                        ) : (
                            ""
                        )}
                    </>
                );
            });
        } else if (reportType === "Check-in/out") {
            return list.map((data: any, index: number) => {
                return data.list.map((column: any, index: number) => {
                    return (
                        <>
                            <ContentDetailsAccordion key={index}>
                                <TextCenterDetails>
                                    {getFirstAndLastName(capitalizeText(data._id.user[0].name))}
                                </TextCenterDetails>

                                <TextCenterDetails>
                                    {handleFunction(data._id.user[0].companies_links, company_id)}
                                </TextCenterDetails>

                                <TextCenterDetails>
                                    {formatDate(column[0].created_at, "HH:mm")}
                                </TextCenterDetails>
                                <TextCenterDetails>
                                    {column[1] ? formatDate(column[1].created_at, "HH:mm") : "-"}
                                </TextCenterDetails>
                            </ContentDetailsAccordion>
                            {list.length !== index + 1 ? (
                                <Divider sx={{width: "100%", margin: "0 auto"}}/>
                            ) : (
                                ""
                            )}
                        </>
                    );
                });
            });
        } else {
            return list.map((column: IAccordionInfo, index: number) => {
                return (
                    <>
                        <ContentDetailsAccordion key={column._id}>
                            <TextCenterDetails
                                sx={{
                                    width: "80px",
                                    textDecoration: `${
                                        column.canceled ? "line-through" : "none"
                                    }`,
                                    color: `${column.canceled ? "#7D7D7D" : "#333333"}`,
                                }}
                            >
                                {formatDate(column.created_at, "HH:mm")}
                            </TextCenterDetails>
                            <TextCenterDetails
                                sx={{
                                    textDecoration: `${
                                        column.canceled ? "line-through" : "none"
                                    }`,
                                    color: `${column.canceled ? "#7D7D7D" : "#333333"}`,
                                }}
                            >
                                {getFirstAndLastName(capitalizeText(column.created_by[0].name))}
                            </TextCenterDetails>
                            <TextCenterDetails
                                sx={{
                                    textDecoration: `${
                                        column.canceled ? "line-through" : "none"
                                    }`,
                                    color: `${column.canceled ? "#7D7D7D" : "#333333"}`,
                                }}
                            >
                                {handleFunction(column, company_id)}
                            </TextCenterDetails>
                            <TextCenterDetails
                                sx={{
                                    width: "320px",
                                    textDecoration: `${
                                        column.canceled ? "line-through" : "none"
                                    }`,
                                    color: `${column.canceled ? "#7D7D7D" : "#333333"}`,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "4px",
                                        margin: "2px",
                                    }}
                                >
                                    {handleMeasurementItemsIcons(column.itens, column.canceled)}
                                </Box>
                            </TextCenterDetails>
                            <TextCenterDetails
                                sx={{width: "100px", justifyContent: "flex-start"}}
                            >
                                <DownloadIcon
                                    sx={{color: "var(--secondary)", marginRight: "8px"}}
                                />
                                <PrintIcon sx={{color: "var(--secondary)"}}/>
                            </TextCenterDetails>
                        </ContentDetailsAccordion>
                        {list.length !== index + 1 ? (
                            <Divider sx={{width: "100%", margin: "0 auto"}}/>
                        ) : (
                            ""
                        )}
                    </>
                );
            });
        }
    };

    return (
        <>
            {content.loading && <Loading/>}

            {content.data ? (
                reportType === "Aferições" ||
                reportType === "Evolução" ||
                reportType === "Check-in/out" ? (
                    <Container>
                        {content.data.map(
                            ({_id, list}: IDataAccordion, index: number) => {
                                return (
                                    <Accordion
                                        key={_id}
                                        disableGutters={true}
                                        expanded={expanded === `panel${index}`}
                                        onChange={handleChange(`panel${index}`)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls={`panel${index}bh-content`}
                                            id={`panel${index}bh-header`}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: "8px",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                {reportType === "Aferições" ? (
                                                    <IconMeasurement
                                                        fill={
                                                            expanded === `panel${index}`
                                                                ? "var(--white)"
                                                                : "var(--gray-dark)"
                                                        }
                                                        width="22px"
                                                        height={"22px"}
                                                    />
                                                ) : reportType === "Evolução" ? (
                                                    <Evolution
                                                        fill={
                                                            expanded === `panel${index}`
                                                                ? "var(--white)"
                                                                : "var(--gray-dark)"
                                                        }
                                                        width={"22px"}
                                                        height={"22px"}
                                                    />
                                                ) : reportType === "Check-in/out" ? (
                                                    <Check
                                                        fill={
                                                            expanded === `panel${index}`
                                                                ? "var(--white)"
                                                                : "var(--gray-dark)"
                                                        }
                                                        width={"22px"}
                                                        height={"22px"}
                                                    />
                                                ) : (
                                                    ""
                                                )}

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    {formatDate(_id, "DD/MM/YY")}
                                                </Box>
                                            </Box>
                                            <Box>
                                                {reportType === "Evolução" && (
                                                    <DownloadIcon
                                                        sx={{cursor: "pointer", marginRight: "12px"}}
                                                    />
                                                )}
                                                <IconButton color="secondary" aria-label="print"
                                                            sx={{cursor: "pointer", height: "10px"}}
                                                            onClick={() => {
                                                                if (reportType === "Check-in/out") {
                                                                    const payload = {
                                                                        _id: "",
                                                                        type: "Group",
                                                                        name: "",
                                                                        dataStart: _id,
                                                                        dataEnd: _id,
                                                                        reportType: "Check-in/out",
                                                                        attendance_id: state?.data?._id,
                                                                    }
                                                                    dispatch(loadCheckinFilterRequest(payload))
                                                                }
                                                            }}>
                                                    <PrintIcon
                                                        sx={{cursor: "pointer", marginRight: "12px"}}
                                                    />
                                                </IconButton>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {handleHeaderDetails()}
                                            {handleRow(list)}
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            }
                        )}
                    </Container>
                ) : reportType === "Alergias" ? (
                    <Container>
                        {Object.keys(content.data).map((item: any, index: number) => {
                            return (
                                <Accordion
                                    key={item}
                                    disableGutters={true}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls={`panel${index}bh-content`}
                                        id={`panel${index}bh-header`}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "8px",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Allergy
                                                fill={
                                                    expanded === `panel${index}`
                                                        ? "var(--white)"
                                                        : "var(--gray-dark)"
                                                }
                                                width="22px"
                                                height={"22px"}
                                            />
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                {item === "allergy" && "Alergias"}
                                                {item === "event" && "Eventos adversos"}
                                            </Box>
                                        </Box>
                                        <TextCenterDetails
                                            sx={{width: "100px", justifyContent: "flex-start"}}
                                        >
                                            <DownloadIcon
                                                sx={{cursor: "pointer", marginRight: "12px"}}
                                            />
                                            <PrintIcon
                                                sx={{cursor: "pointer", marginRight: "12px"}}
                                            />
                                        </TextCenterDetails>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {handleHeaderDetails(item)}
                                        {handleRow(content.data[item], item)}
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </Container>
                ) : (
                    ""
                )
            ) : (
                <Box
                    sx={{
                        textAlign: "center",
                        color: "var(--gray-dark)",
                        padding: "8px 0 16px",
                    }}
                >
                    Não há relatórios para o prontuário de {reportType}
                </Box>
            )}

            {content.error &&
                toast.error("Não foi possível carregar os relatórios deste prontuário")}
        </>
    );
}
