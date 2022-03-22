import React, {useState, useEffect} from 'react'
import './gameboard.css'

const rows = 10
const coll = 10

const Gameboard = () => {

  const [board, setBoard] = useState(initialBoard())
  const [symbol, setSymbol] = useState("X")

  function initialBoard(){
    const board = []

    for(let i=0; i<rows;i++){
      board.push([])
      for(let y=0; y<coll;y++){
        board[i].push(null)
      }
    }
      return board
  }



  const handleClick = (e)=>{
   
    const {row, col} = e.target.dataset
    const newBoard = JSON.parse(JSON.stringify(board))
    if(newBoard[row][col] === null){
    newBoard[row][col]= symbol  
    checkWinner()
    setSymbol((symbol)=>symbol === "X" ? setSymbol("O"):setSymbol("X"))  
    setBoard(newBoard)
    
    
  }else{
      setBoard(board)
    }
  }

  const checkWinner=()=>{
    // horizontal
    for(let row of board){
      const winner =  getWinner(row)  
      if(winner !== undefined){
        alert(`${winner} win`)
      } 
    }
    // vertical

    const trasposedArray = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
     for(let row of trasposedArray){
      const winner =  getWinner(row)  
      if(winner !== undefined){
        alert(`${winner} win`)
      } 
    }
    // main and cross diagonal
       const diagonal = getWinnerInDiagonal()
       for(let row of diagonal){
         const winner = getWinner(row) 
          if(winner !== undefined){
          alert(`${winner} win`)
      } 
    }
  }

  function getWinner(row){
    let counter = 1
    for(let cel of row){
      if(cel === symbol){
        counter ++
        if(counter === 5){
        return symbol
      }
      }else{
        counter = 1
      }
    }  
  }


  // main and cross diagonal

 function getWinnerInDiagonal(){

  let diagonalSum = []
  let board1 = [...board]
  let board2 = board.map(row=>[...row].reverse())

  function getDiagonal(board, x, y){
    let diagonal = []
    while(Array.isArray(board[x]) && typeof board[x][y] !== 'undefined'){
        diagonal.push(board[x][y])
        x++
        y++
    }
    return diagonal
  }

    for(let i=0; i<board.length; i++){
     diagonalSum.push(getDiagonal(board1, i, 0))
     diagonalSum.push(getDiagonal(board1, 0, i))
     diagonalSum.push(getDiagonal(board2, i, 0))
     diagonalSum.push(getDiagonal(board2, 0, i))
    }
  return diagonalSum
  }
  return (
    <>
    <button className='btn' onClick={()=>setBoard(initialBoard())}>New Game</button>
      <table className='table-body'>
        <tbody className='table-body'>
          {board.map((rows, rowIndex)=>{
           return(
           <tr key={Math.random()*10000}>
              {board[rowIndex].map((coll, colIndex)=>{
               return(
               <td key={Math.random()*100000}
               className= {rows[colIndex] === null ? `table-row`:`notAllowed`}
               data-row={rowIndex}
               data-col={colIndex}
               onClick={(e)=>{handleClick(e)}}
               >{rows[colIndex]}</td>)})}
           </tr>)})}
         </tbody>
      </table>
  </>
  )
}

export default Gameboard