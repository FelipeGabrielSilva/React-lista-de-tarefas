// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
import './TodoList.css';
import Icone from './assets/img-lista-tarefa.png'

function TodoList(){
     const listaStorage = localStorage.getItem('Lista');

     const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
     const [novoItem, setNovoItem] = useState("");

     useEffect(()=> {
          localStorage.setItem('Lista', JSON.stringify(lista)),
          [lista];
     })

     function adicionarItem(form){
          form.preventDefault();
          if(!novoItem) {
               return;
          } setLista([...lista, {text: novoItem, isCompleted: false}])
          setNovoItem("");
          document.getElementById('input-entrada').focus();
     }

     function clicou(index){
          const listaAux = [...lista];
          listaAux[index].isCompleted = !listaAux[index].isCompleted;
          setLista(listaAux);
     }

     function deletar(index){
          const listaAux = [...lista];
          listaAux.splice(index,1);
          setLista(listaAux);
     }

     function deletarTudo(){
          setLista([]);
     }

     return (
          <div>
               <h1>Lista de tarefas</h1>
               <form onSubmit={adicionarItem}>
                    <input type="text" value={novoItem} onChange={(e)=>{setNovoItem(e.target.value)}} placeholder="Adicione uma tarefa" id="input-entrada"/>
                    <button className="add" type="submit">Add</button>
               </form>
               <div className="listaTarefas">
                    <div style={{textAlign:'center'}}>
                         {
                              lista.length < 1
                              ?
                              <img className="iconeCentral" src={Icone}/>
                              :
                              lista.map((item, index)=>(
                                   <div key={index} className={item.isCompleted ? "item completo" : "item"} >
                                        <span onClick={()=>{clicou(index)}}>{item.text}</span>
                                        <button onClick={()=>{deletar(index)}} className="del">Deletar</button>
                                   </div>
                              ))
                         }
                         {
                              lista.length > 0 &&
                              <button onClick={()=>{deletarTudo()}}
                              className="delAll">Deletar todas</button>
                         }
                    </div>
               </div>
          </div>
     )
}

export default TodoList