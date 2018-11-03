import React from 'react';
import logo from '../img/rickandmorty.jpg';
const Header = () => (
	<div>
		<div style={{background:'#3a3839', height:'100px', display:'flex', justifyContent:'center'}}>
			<img src={logo} width='250px' alt=""/>
		</div>
	</div>
);

export default Header;
