import React from "react";
import { Text, Image, View, StyleSheet } from "@react-pdf/renderer";

import CheckImage from "../../../images/check-success.png";
import { BorderStyle } from "@mui/icons-material";

interface IOption {
  checked?: boolean;
  label: string;
}

export default function PDFOptionCheck(props: IOption) {
  return (
    <View style={styles.option}>
      {/* <Image
        style={[styles.icon, (props?.checked) ? styles.checked : styles.unchecked]}
        src={CheckImage}
      /> */}
      <View
        style={[
          styles.check,
          props?.checked ? styles.checked : styles.unchecked,
        ]}
      ></View>
      <Text style={{ marginLeft: 5 }}>{props.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: { width: 15, height: 15 },
  unchecked: { backgroundColor: "#F2F2F2" },
  checked: { backgroundColor: "#4FC66A" },
  check: {
    width: 15,
    height: 15,
    border: 1,
    borderColor: "#ccc",
    borderRadius: 40,
    borderStyle: "solid",
  },
});
