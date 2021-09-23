import React from "react";
import {H1, Wrapper, Balloon, ButtonsContent, ButtonsContent2} from "./styles";
import {RouteComponentProps, useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";

interface IPageParams {
  mode?: string;
}

export default function Surprise(props: RouteComponentProps<IPageParams>) {
  const {params} = props.match;
  const history = useHistory();

  return (
    <>
      <Wrapper>
        {params.mode === 'message' ? (
          <>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px'}}>
              <h1 style={{color: 'var(--white)', paddingBottom: '50px'}}>Feliz Aniversário</h1>
              <h1 style={{color: 'var(--white)'}}>
                Cris,<br/><br/>
                “Hoje é um dia especial: o seu dia!” (bem comercial de banco rsrs) Tu não sabes a importância que conquistasse em nossas vidas. Pois, é amiga! Começou com os almoços, depois as resenhas, as confissões e desabafos dos problemas diários, acabou sendo acolhida e nos acolheu.
                <br/><br/>Amiga, tu és um ser admirável (sim, tudo que Bruno já te falou é consenso entre nós), rica em amor, sensibilidade, uma luz que irradia e dedicação aos que ama. O Universo está vibrando em alegria porque é teu aniversário, mais uma volta ao Sol, o encerramento de um ciclo bem vivido e cheio de aprendizados. E, o que seria de nós se não conseguíssemos aprender, amar e sofrer durante nossa trajetória na Terra? Você é evolução constante, amiga.
                <br/><br/>Somos muito gratos em te ter presente em nossa vida. Obrigadx por tudo e feliz novo ciclo!

                <br/><br/>Te amamos, coisa linda 💙

                <br/><br/>Grupo BBB.
              </h1>
              <ButtonsContent2>
                <Button style={{color: 'var(--white)', background: 'var(--secondary)'}}
                        onClick={() => history.push('/message')}
                >
                  Mensagem
                </Button>
                <Button style={{color: 'var(--white)', background: 'var(--secondary)'}}
                        onClick={() => history.push('/')}
                >
                  Início
                </Button>
                <Button style={{color: 'var(--white)', background: 'var(--secondary)'}}
                        onClick={() => history.push('/cris')}
                >
                  Cris
                </Button>
              </ButtonsContent2>
            </div>
          </>
        ) : (
          <>
            {params.mode === 'cris' ? (
              <>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h1 style={{color: 'var(--white)', paddingBottom: '50px'}}>Feliz Aniversário</h1>
                  <div>
                    <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}><span
                      style={{color: 'var(--primary)'}}>C</span>ada noite como uma estrela cadente</h1>
                    <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}><span
                      style={{color: 'var(--primary)'}}>R</span>aias os céus, espalhando seu brilho
                      comovente</h1>
                    <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}><span
                      style={{color: 'var(--primary)'}}>I</span>rradiando toda sua energia
                      transcendente</h1>
                    <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}><span
                      style={{color: 'var(--primary)'}}>S</span>ua alegria é como um buquê de noiva</h1>
                    <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}><span
                      style={{color: 'var(--primary)'}}>T</span>razendo e emanando de si sua energia
                      reconstrutiva</h1>
                    <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}><span
                      style={{color: 'var(--primary)'}}>I</span>luminado e restaurando nossas vida
                      desconstrutiva</h1>
                    <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}><span
                      style={{color: 'var(--primary)'}}>A</span>mizade é uma Inspiração divina que
                      avaliza</h1>
                    <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}><span
                      style={{color: 'var(--primary)'}}>N</span>as horas mais difíceis tudo se
                      idealiza</h1>
                    <h1 style={{color: 'var(--white)', paddingBottom: '50px'}}><span
                      style={{color: 'var(--primary)'}}>E</span>voluir sempre é não ter hora de ser
                      apreciativa</h1>
                  </div>
                  <ButtonsContent2>
                    <Button style={{color: 'var(--white)', background: 'var(--secondary)'}}
                            onClick={() => history.push('/message')}
                    >
                      Mensagem
                    </Button>
                    <Button style={{color: 'var(--white)', background: 'var(--secondary)'}}
                            onClick={() => history.push('/')}
                    >
                      Início
                    </Button>
                    <Button style={{color: 'var(--white)', background: 'var(--secondary)'}}
                            onClick={() => history.push('/cris')}
                    >
                      Cris
                    </Button>
                  </ButtonsContent2>
                </div>
              </>
            ) : (
              <>
                <Balloon>
                  <div><h2>☺</h2>
                  </div>
                  <div><h2>C</h2>
                  </div>
                  <div><h2>R</h2>
                  </div>
                  <div><h2>I</h2>
                  </div>
                  <div><h2>S</h2>
                  </div>
                  <div><h2>!</h2>
                  </div>
                </Balloon>
                <H1>Feliz Aniversário</H1>
                <ButtonsContent>
                  <Button style={{color: 'var(--white)', background: 'var(--secondary)'}}
                          onClick={() => history.push('/message')}
                  >
                    Mensagem
                  </Button>
                  <Button style={{color: 'var(--white)', background: 'var(--secondary)'}}
                          onClick={() => history.push('/')}
                  >
                    Início
                  </Button>
                  <Button style={{color: 'var(--white)', background: 'var(--secondary)'}}
                          onClick={() => history.push('/cris')}
                  >
                    Cris
                  </Button>
                </ButtonsContent>
              </>
            )}
          </>
        )}
      </Wrapper>
    </>
  )
}
