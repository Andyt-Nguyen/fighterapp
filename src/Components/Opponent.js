import React from 'react';
import Avatar from '../Components/Avatar';
import Fail from './Fail';
const Opponent = ({right, opponents, opponent, atkPower, showAtkPoints, text}) => (
	<h3 style={{...styles,position:'absolute', right:`${right}`}}>
		{
			opponent.hp <= 0
			? <Fail text={text} />
			: ''
		}
		{
			opponents !== []
			? <div>
					<Avatar width="300px" height="300px" img={opponent.img}/>
					<br/>
					<div style={{...styles, background:'green', width:`${ opponent.hp <= 0  ? 0 : (opponent.hp/120)*100}%`, borderRadius:'5px', height:'5px'}} />
					<p style={{color:'dodgerblue',}}>
					{
						showAtkPoints
						? opponent.hp <= 0 ? '' : -atkPower
						: ''

					}
					</p>
				</div>
			: ''
		}
	</h3>
);


const styles = {
	transition: 'all 1s linear'
}

export default Opponent;
