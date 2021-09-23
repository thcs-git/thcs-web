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
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h1 style={{color: 'var(--white)', paddingBottom: '50px'}}>Feliz Aniversário</h1>
              <h1 style={{color: 'var(--white)'}}>

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
