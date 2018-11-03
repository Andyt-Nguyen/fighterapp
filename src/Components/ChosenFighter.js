import React from 'react';
import Avatar from '../Components/Avatar';
import Fail from './Fail';

const ChosenFighter = ({chosenFighter, left, counterAtk, showAtkPoints}) => (
	<h3 style={{...styles,position:'absolute', left:`${left}`}}>
		{
			chosenFighter !== null

			? <div>
					{ chosenFighter.hp <= 0 ? <Fail text={"Game Over"}/> : '' }
					<Avatar width="300px" height="300px" img={chosenFighter.img} />
					<br />
					<div style={{...styles, background:'dodgerblue', width:`${ chosenFighter.hp <= 0  ? 0 : (chosenFighter.hp/120)*100}%`, borderRadius:'5px', height:'5px'}} />
					<p style={{color:'crimson'}}>
					{
						showAtkPoints
						? chosenFighter.hp <= 0 ? '' : -counterAtk
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

export default ChosenFighter;
