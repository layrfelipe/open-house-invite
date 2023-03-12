import React, { useState, useEffect } from 'react';
import { CaretLeft, CaretRight, UserPlus, Check, XSquare } from '@phosphor-icons/react';
import axios from "axios";

import "./styles.scss";

const App = () => {

  const [stage, setStage] = useState(1);
  const [gifts, setGifts] = useState([]);
  const [form, showForm] = useState(false);
  const [pickedGift, setPickedGift] = useState("");
  const [friend, setFriend] = useState("");

  async function getGifts() {
    await axios.get("https://open-house-api.onrender.com/gifts").then((response) => {
      setGifts(response.data);
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getGifts();
  }, [])

  const handleForm = (id: string) => {
    setPickedGift(id);
    showForm(!form);
  }

  const confirmGift = async () => {
    await axios.patch(`https://open-house-api.onrender.com/gifts/${pickedGift}`, {
      friend: friend
    })
    .then((response) => {
      gifts.map((gift: any) => {
        if (gift._id == pickedGift) {
          gift.friend = friend
        }
      })    
    })
    .catch((error) => {
      console.log(error);
    })
    setPickedGift("");
    setFriend("");
    handleForm("");   
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Olá! Se você recebeu esse link é porque você é especial...</h2>
        <h1>OPEN HOUSE - LAYR E MACLA</h1>
        <h3>07/04 às 18h</h3>
      </div>

      <div className="content">
        <CaretLeft size={40} color="#C68F8E" className="caret" onClick={() => stage == 1 ? "" : setStage(stage - 1)}/>

        <div className="main-wrapper">
          <div className="header">
            <div className="circle">
              {stage == 1 && <h6>1</h6>}
              {stage == 2 && <h6>2</h6>}
              {stage == 3 && <h6>3</h6>}
              {stage == 4 && <h6>4</h6>}
              {stage == 5 && <h6>5</h6>}
            </div>
            <span className="divider"></span>
          </div>

          <div className="content">
            {stage == 1 &&
              <>
                <p>
                  Nós vamos rachar um apê e você está convidado a passar um momento especial conosco...
                  <br/><br/>
                  Estaremos de portas abertas para receber nossos amigos e apresentar nosso novo cafofo!
                  <br/><br/>
                  Teremos comidinhas e bebidinhas, mas o álcool ficará por conta da galera...
                </p>

                <button onClick={() => setStage(2)}>Hmm... Bora!</button>
              </>
            }

            {stage == 2 &&
              <>
                <p>
                  Nossa casinha ainda é simples, mas faremos de tudo para recebê-los com muito conforto.
                  <br/><br/>
                  Afinal, oferecer conforto e tempo de qualidade é uma forma de amar.
                  <br/><br/>
                  E nós amamos nossos amigos! Não saberíamos o que seria de nós sem vocês...
                </p>

                <button onClick={() => setStage(3)}>s2s2s2</button>
              </>
            }

            {stage == 3 &&
              <>
                <p>
                  Por falar em amar... Sabe o que mais é uma linguagem do amor?
                  <br/><br/>
                  <span>PRESENTINHOS</span>
                  <br/><br/>
                  Se esse convite tocar seu coração, você pode acessar nossa lista de coisas ainda não compradas pro cafofo novo!
                </p>

                <button onClick={() => setStage(4)}>Ver lista</button>
              </>
            }

            {stage == 4 &&
              <>
                <p>
                  Escolha o(s) presente(s) e adicione seu nome para não haver repetições
                </p>

                <div className="gifts-wrapper">
                  {
                    gifts.map((gift: any) => {
                      return (
                        <>
                          <div className="row" onClick={() => gift.friend ? "" : handleForm(gift._id)}>
                            <p className={gift.friend ? "picked" : "available"}>{gift.description}</p>
                            { gift.friend ? <Check size={32} color="#C68F8E" className="action-icon" /> : <UserPlus size={32} color="#C68F8E" className="action-icon"/> }
                          </div>

                          <span className="divider"></span>
                        </>
                      );
                    })
                  }
                </div>
              </>
            }

            {stage == 5 &&
              <>
                <p>
                  Só para lembrar: não se sinta na obrigação de nada, ok?
                  <br/><br/>
                  Sabemos que está difícil pra geral e vamos entender se não puder comprar algo...
                  <br/><br/>
                  Sua presença é essencial COM ou SEM presente!
                </p>

                <a href="https://whatsapp.com/" rel="noreferrer" target="_blank">GRUPO DO ZAP</a>
              </>
            }

            {form &&
              <div className="form">
                <div className="header">
                  <XSquare size={40} color="#C68F8E" className="close-form" onClick={() => handleForm("")}/>                
                </div>

                <div className="content">
                  <h3>Digite seu nome para bloquear esse presente</h3>
                  <input value={friend} onChange={(e) => { setFriend(e.target.value) }}/>
                  <button onClick={() => confirmGift()}>Confirmar</button>
                </div>
              </div>
            }
          </div>
        </div>

        <CaretRight size={40} color="#C68F8E" className="caret" onClick={() => stage == 5 ? "" : setStage(stage + 1)}/>
      </div>
    </div>
  );
};

export default App;