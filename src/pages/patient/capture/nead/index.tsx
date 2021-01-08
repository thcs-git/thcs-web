import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Container, StepLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';


import Sidebar from '../../../../components/Sidebar';

import Button from '../../../../styles/components/Button';
import { FormTitle, QuestionSection, QuestionTitle, ScoreTotalContent, ScoreLabel, ScoreTotal } from '../../../../styles/components/Form';
import { StepperComponent, StepComponent, StepTitle } from '../../../../styles/components/Step';

import { ButtonsContent, FormContent } from './styles';

interface IFieldOption {
  text: string;
  value: string | number;
};

export default function Nead() {
  const steps = ['Grupo 1', 'Grupo 2', 'Grupo 3', 'Escore de Katz'];
  const fields = [
    {
      "required": true,
      "active": true,
      "description": "1. Quadro Clínico",
      "type": "radio",
      "options": [
        {
          "text": "Estável (0 pontos)",
          "value": 0
        },
        {
          "text": "Não estável (2 pontos)",
          "value": 2
        }
      ]
    },
    {
      "required": true,
      "active": true,
      "description": "2. Aspirações traqueais",
      "type": "radio",
      "options": [
        {
          "text": "Ausentes (0 pontos)",
          "value": 0
        },
        {
          "text": "Até 3 aspirações (1 ponto)",
          "value": 1
        },
        {
          "text": "3 a 6 aspirações (2 pontos)",
          "value": 2
        },
        {
          "text": "Mais de 6 aspirações (4 pontos)",
          "value": 4
        }
      ]
    },
    {
      "required": true,
      "active": true,
      "description": "3. Sondas/drenos/cateteres/ostomia",
      "type": "radio",
      "options": [
        {
          "text": "Ausentes (0 pontos)",
          "value": 0
        },
        {
          "text": "Presente e com família apta (1 ponto)",
          "value": 1
        },
        {
          "text": "Presente e sem família apta (2 pontos)",
          "value": 2
        }
      ]
    },
    {
      "required": true,
      "active": true,
      "description": "4. Procedimentos técnicos invasivos",
      "type": "radio",
      "options": [
        {
          "text": "Ausentes (0 pontos)",
          "value": 0
        },
        {
          "text": "1x ao dia (1 ponto)",
          "value": 1
        },
        {
          "text": "2x ao dia (2 pontos)",
          "value": 2
        },
        {
          "text": "3x ao dia (3 pontos)",
          "value": 3
        },
        {
          "text": "4x ao dia (4 pontos)",
          "value": 4
        },
        {
          "text": "mais de 4x ao dia (5 pontos)",
          "value": 5
        }
      ]
    },
    {
      "required": true,
      "active": true,
      "description": "5. Padrão respiratório",
      "type": "radio",
      "options": [
        {
          "text": "Epnéico (0 pontos)",
          "value": 0
        },
        {
          "text": "Período de dispneia (1 ponto)",
          "value": 1
        },
        {
          "text": "Dispneia constante (2 pontos)",
          "value": 2
        },
        {
          "text": "Períodos de apneia (3 pontos)",
          "value": 3
        }
      ]
    },
    {
      "required": true,
      "active": true,
      "description": "6. Dependência O2",
      "type": "radio",
      "options": [
        {
          "text": "Ausente (0 pontos)",
          "value": 0
        },
        {
          "text": "Parcial (1 ponto)",
          "value": 1
        },
        {
          "text": "Contínua (2 pontos)",
          "value": 2
        },
        {
          "text": "Ventilação não invasiva (3 pontos)",
          "value": 3
        },
        {
          "text": "Ventilação invasiva intermitente (4 pontos)",
          "value": 4
        },
        {
          "text": "Ventilação invasiva contínua (5 pontos)",
          "value": 5
        }
      ]
    },
    {
      "required": true,
      "active": true,
      "description": "7. Curativos",
      "type": "radio",
      "options": [
        {
          "text": "Ausentes ou simples (0 pontos)",
          "value": 0
        },
        {
          "text": "Pequenos (1 ponto)",
          "value": 1
        },
        {
          "text": "Médios (2 pontos)",
          "value": 2
        },
        {
          "text": "Grandes/múltiplos (3 pontos)",
          "value": 3
        }
      ]
    }
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = useCallback(() => {
    setCurrentStep(prevState => (prevState + 1))
  }, [currentStep]);

  const handleBackStep = useCallback(() => {
    setCurrentStep(prevState => (prevState - 1))
  }, [currentStep]);

  return (
    <Sidebar>
      <Container>
        <FormTitle>Tabela de avaliação para planejamento de atenção domiciliar</FormTitle>
        <StepperComponent activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <StepComponent key={label}>
              <StepLabel>{label}</StepLabel>
            </StepComponent>
          ))}
        </StepperComponent>

        <FormContent>
          {/* Grupo 1 */}
          {currentStep === 0 && (
            <>
              <StepTitle>Elegibilidade</StepTitle>

              {fields.map(field => (
                <QuestionSection>
                  <QuestionTitle>{field.description}</QuestionTitle>
                  <RadioGroup onChange={e => console.log(e.target.value)}>
                    {field.options.map((option: any) => (
                      <FormControlLabel value={option.value} control={<Radio color="primary" />} label={option.text} />
                    ))}
                  </RadioGroup>
                </QuestionSection>
              ))}

              {/* <QuestionSection>
                <QuestionTitle>1. Apresenta cuidador em periodo integral?</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Sim" control={<Radio color="primary" />} label="Sim" />
                  <FormControlLabel value="Não" control={<Radio color="primary" />} label="Não" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>2. O domicílio é livre de risco?</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Sim" control={<Radio color="primary" />} label="Sim" />
                  <FormControlLabel value="Não" control={<Radio color="primary" />} label="Não" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>3. Existem algum impedimento para se deslocar atê a rede credenciada?</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Sim" control={<Radio color="primary" />} label="Sim" />
                  <FormControlLabel value="Não" control={<Radio color="primary" />} label="Não" />
                </RadioGroup>
              </QuestionSection> */}

              <p><i>*Se responder "NÃO" a qualquer uma das questões acima, considerar contraindicar Atenção Domiciliar</i></p>
            </>
          )}

          {/* Grupo 2 */}
          {currentStep === 1 && (
            <>
              <StepTitle>Critérios para indicação imediata de internação domiciliar*</StepTitle>
              <QuestionSection>
                <QuestionTitle>1. Alimentação parenteral</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Até 12 horas/dia" control={<Radio color="primary" />} label="Até 12 horas/dia" />
                  <FormControlLabel value="Mais de 12 horas/dia" control={<Radio color="primary" />} label="Mais de 12 horas/dia" />
                  <FormControlLabel value="Não utiliza" control={<Radio color="primary" />} label="Não utiliza" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>2. Aspiração de traqueostomia/vias aéreas inferiores</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Até 5 vezes/dia" control={<Radio color="primary" />} label="Até 5 vezes/dia" />
                  <FormControlLabel value="Mais de 5 vezes/dia" control={<Radio color="primary" />} label="Mais de 5 vezes/dia" />
                  <FormControlLabel value="Não utiliza" control={<Radio color="primary" />} label="Não utiliza" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>3. Ventilação mecânica contínua invasiva ou não</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Até 12 horas/dia" control={<Radio color="primary" />} label="Até 12 horas/dia" />
                  <FormControlLabel value="Mais de 12 horas/dia" control={<Radio color="primary" />} label="Mais de 12 horas/dia" />
                  <FormControlLabel value="Não utiliza" control={<Radio color="primary" />} label="Não utiliza" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>4. Medicação parenteral ou hipodermóclise</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Até 4 vezes/dia" control={<Radio color="primary" />} label="Até 4 vezes/dia" />
                  <FormControlLabel value="Mais de 4 vezes/dia" control={<Radio color="primary" />} label="Mais de 4 vezes/dia" />
                  <FormControlLabel value="Dependente total" control={<Radio color="primary" />} label="Dependente total" />
                </RadioGroup>
              </QuestionSection>

              <p><i>*Para indicação de Planejamento de Atenção (P.A.D.), considerar a maior complexidade assinalada, ainda que a única vez.</i></p>
            </>
          )}

          {/* Grupo 3 */}
          {currentStep === 2 && (
            <>
              <StepTitle>Critérios para indicação imediata de internação domiciliar</StepTitle>
              <QuestionSection>
                <QuestionTitle>1. Estado nutricional</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Eutrófico" control={<Radio color="primary" />} label="Eutrófico (0 pontos)" />
                  <FormControlLabel value="Sobrepeso/emagrecido" control={<Radio color="primary" />} label="Sobrepeso/emagrecido (1 ponto)" />
                  <FormControlLabel value="Obeso/desnutrido" control={<Radio color="primary" />} label="Obeso/desnutrido (2 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>2. Alimentação ou medicamentos por via enteral</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Sem auxílio" control={<Radio color="primary" />} label="Sem auxílio (0 pontos)" />
                  <FormControlLabel value="Assistido" control={<Radio color="primary" />} label="Assistido (1 pontos)" />
                  <FormControlLabel value="Gastrostomia/jejunostomia" control={<Radio color="primary" />} label="Gastrostomia/jejunostomia (2 pontos)" />
                  <FormControlLabel value="Por SNG/SNE" control={<Radio color="primary" />} label="Por SNG/SNE* (3 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>3. KATZ (se pediatria, considerar dependência total)</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Independente" control={<Radio color="primary" />} label="Independente (0 pontos)" />
                  <FormControlLabel value="Dependente parcial" control={<Radio color="primary" />} label="Dependente parcial (1 ponto)" />
                  <FormControlLabel value="Dependente total" control={<Radio color="primary" />} label="Dependente total (2 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>4. Internações no último ano</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="0-1 internação" control={<Radio color="primary" />} label="0-1 internação (0 pontos)" />
                  <FormControlLabel value="2-3 internações" control={<Radio color="primary" />} label="2-3 internações (1 ponto)" />
                  <FormControlLabel value="> 3 internações" control={<Radio color="primary" />} label="> 3 internações (2 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <ScoreTotalContent>
                <ScoreLabel>PONTUAÇÃO FINAL:</ScoreLabel>
                <ScoreTotal>0</ScoreTotal>
              </ScoreTotalContent>
            </>
          )}

          {/* Score de Katz */}
          {currentStep === 3 && (
            <>
              <StepTitle>Atividades</StepTitle>
              <QuestionSection>
                <QuestionTitle>1. Banhar-se</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Banha-se completamente ou necessita de auxílio somente para lavar uma parte do corpo, como as costas, genitais ou uma extremidade incapacitada" control={<Radio color="primary" />} label="Banha-se completamente ou necessita de auxílio somente para lavar uma parte do corpo, como as costas, genitais ou uma extremidade incapacitada (1 ponto)" />
                  <FormControlLabel value="Necessita de ajuda para banhar-se em mais de uma parte do corpo, entrar e sair do chuveiro ou banheira ou requer assistência total no banho" control={<Radio color="primary" />} label="Necessita de ajuda para banhar-se em mais de uma parte do corpo, entrar e sair do chuveiro ou banheira ou requer assistência total no banho (0 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>2. Vistir-se</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Pega as roupas do armário e veste as roupas íntimas externas e cintos. Pode receber ajuda para amarrar os sapatos" control={<Radio color="primary" />} label="Pega as roupas do armário e veste as roupas íntimas externas e cintos. Pode receber ajuda para amarrar os sapatos (1 ponto)" />
                  <FormControlLabel value="Necessita de ajuda para vestir-se ou necessita ser completamente vestido" control={<Radio color="primary" />} label="Necessita de ajuda para vestir-se ou necessita ser completamente vestido (0 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>3. Ir ao banheiro</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Dirige-se ao banheiro, entra e sai do mesmo, arruma suas próprias roupas, limpa a área genital sem ajuda" control={<Radio color="primary" />} label="Dirige-se ao banheiro, entra e sai do mesmo, arruma suas próprias roupas, limpa a área genital sem ajuda (1 ponto)" />
                  <FormControlLabel value="Necessita de ajuda para ir ao banheiro, limpar-se ou usa urinol ou comadre no banho" control={<Radio color="primary" />} label="Necessita de ajuda para ir ao banheiro, limpar-se ou usa urinol ou comadre no banho (0 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>4. Transferência</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Senta-se, deita-se e se levanta da cama ou cadeira sem ajuda, equipamentos mecânicos de ajuda são aceitáveis" control={<Radio color="primary" />} label="Senta-se, deita-se e se levanta da cama ou cadeira sem ajuda, equipamentos mecânicos de ajuda são aceitáveis (1 ponto)" />
                  <FormControlLabel value="Necessita de ajuda para sentar-se, deitar-se ou se levantar da cama ou cadeira" control={<Radio color="primary" />} label="Necessita de ajuda para sentar-se, deitar-se ou se levantar da cama ou cadeira (0 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>5. Continência</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Tem completo controle sobre suas eliminações (urinar e evacuar)" control={<Radio color="primary" />} label="Tem completo controle sobre suas eliminações (urinar e evacuar) (1 ponto)" />
                  <FormControlLabel value="É parcial ou totalmente incontinente do intestino ou bexiga" control={<Radio color="primary" />} label="É parcial ou totalmente incontinente do intestino ou bexiga (0 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <QuestionSection>
                <QuestionTitle>6. Alimentação</QuestionTitle>
                <RadioGroup>
                  <FormControlLabel value="Leva a comida do prato à boca sem ajuda. Preparação da comida pode ser feita por outra pessoa" control={<Radio color="primary" />} label="Leva a comida do prato à boca sem ajuda. Preparação da comida pode ser feita por outra pessoa (1 ponto)" />
                  <FormControlLabel value="Necessita de ajuda parcial ou total com a alimentação ou requer alimentação parenteral" control={<Radio color="primary" />} label="Necessita de ajuda parcial ou total com a alimentação ou requer alimentação parenteral (0 pontos)" />
                </RadioGroup>
              </QuestionSection>

              <ScoreTotalContent>
                <ScoreLabel>PONTUAÇÃO KATZ:</ScoreLabel>
                <ScoreTotal>0</ScoreTotal>
              </ScoreTotalContent>
            </>
          )}

          <ButtonsContent>
            <Button
              disabled={currentStep === 0}
              background="default"
              onClick={handleBackStep}
            >
              Anterior
            </Button>

            {currentStep === (steps.length - 1) ? (
              <Button
                background="primary"
                onClick={() => { }}
              >
                Finalizar
              </Button>
            ) : (
                <Button
                  disabled={currentStep === (steps.length - 1)}
                  background="success"
                  onClick={handleNextStep}
                >
                  Próximo
                </Button>
              )}
          </ButtonsContent>
        </FormContent>

      </Container>
    </Sidebar>
  );
}
