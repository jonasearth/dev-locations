import React from 'react';



function Header(props) {
    return (
        <>
            <h1>{props.nome}</h1>
            <h1>{props.idade}</h1>
            <h1>{props.cu}</h1>
        </>
    );
}


  export default Header;