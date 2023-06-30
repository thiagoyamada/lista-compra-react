import { useRef } from 'react'
import { useState } from 'react'
import { v4 } from 'uuid'
import { AddButton, Container, Product, Trashbutton } from './styles'

function Home() {
  const [produtos, setProdutos] = useState([])
  const inputRef = useRef()

  function cliqueiNoBotao() {
    setProdutos([{ id: v4(), nome: inputRef.current.value }, ...produtos])
    inputRef.current.value = ''
  }

  function deletarProduto(id) {
    setProdutos(produtos.filter(produto => produto.id !== id))
  }

  // funçoes para enviar o input quando apertado o enter
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProdutos([{ id: v4(), nome: inputRef.current.value }, ...produtos])
    inputRef.current.value = ''
    setInputValue('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h1>Lista de Compras</h1>
        <input placeholder="Produto..." ref={inputRef} value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} />
        <AddButton onClick={cliqueiNoBotao}>Adicionar</AddButton>

        {
          produtos.map((produto) => (
            <Product key={produto.id}>
              <p>{produto.nome}</p>
              <Trashbutton onClick={() => deletarProduto(produto.id)}>🗑️</Trashbutton>
            </Product>
          ))
        }
      </form>
    </Container>
  )
}

export default Home 