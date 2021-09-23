import React from "react";
import {H1, Wrapper, Balloon, ButtonsContent, ButtonsContent2} from "./styles";
import {RouteComponentProps, useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";

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
                  <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}>C</h1>
                  <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}>R</h1>
                  <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}>I</h1>
                  <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}>S</h1>
                  <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}>T</h1>
                  <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}>I</h1>
                  <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}>A</h1>
                  <h1 style={{color: 'var(--white)', paddingBottom: '10px'}}>N</h1>
                  <h1 style={{color: 'var(--white)', paddingBottom: '50px'}}>E</h1>
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
