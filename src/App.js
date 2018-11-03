import React, { Component } from 'react';
import { meseeks, morty, rick, poopy, beth } from './img';
import Avatar from './Components/Avatar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import FighterContainer from './Components/Styles/FighterContainer';
import Arrow from './Components/Arrow';
import ChosenFighter from './Components/ChosenFighter';
import Opponent from './Components/Opponent';
import Health from './Components/Styles/Health';

class App extends Component {
	constructor() {
		super();
		this.state = {
			hover: false,
			chosenFighter: [],
			opponent: [],
			hideOpponents: false,
			remainingFighters: [],
			counterAtk: Math.floor(Math.random()*24),
			atkPower: 0,
			baseAtkPower: 0,
			theFighters: [
				{name: 'Rick Sanchez', img: rick, hp:120},
				{name: 'Morty Sanchez', img: morty, hp:90},
				{name: 'Poopy', img: poopy, hp:100},
				{name: 'Mr. MeeSeeks', img: meseeks, hp:125},
				{name: 'Beth Sanchez', img:beth, hp:100}
			],
			text: 'Select your fighter',
			type: 'arrowLeft',
			color: '#00b3ca',
			opacity: 1,
			scale: 1,
			xPos: '0px',
			x2Pos: '0px',
			left: '-1000px',
			right: '-1000px',
			showAtkPoints: false,
			hoverAvatars: false,
			textColor: 'dodgerblue'

		}
	}

	renderFighters() {
		return this.state.theFighters.map( a =>
			<div
				style={{cursor:'pointer', position:'relative'}}
				key={a.name}
				onClick={() => this.slideInChosenFighter(a)}>
				<div style={{...styles, transform: `translate(${this.state.xPos})`}}>
					<Avatar width="150px" height="150px" img={a.img} />
					<Health hp={a.hp} color={'dodgerblue'} />
				</div>
			</div>
		);
	}

	slideInChosenFighter(fighter) {
		this.setState({
			type:'arrowRight',
			color: 'limegreen',
			chosenFighter:fighter,
			position:'absolute',
			xPos:'-1000px',
			left:'100px',
			text:'Select your opponent'},
			() => this.removeChosenFighter())
	}

	renderAnonymous() {
		if (this.state.chosenFighter.length !== 0){
			const theFighters = this.state.theFighters;
			const opponents = theFighters.filter( fighter => fighter.name !== this.state.chosenFighter.name);
			return opponents.map( (a, i) =>
				<div
					key={i}
					style={{cursor:'pointer'}}
					onClick={() => this.slideInAnonymousFighters(a)}>
					<div style={{...styles, transform: `translate(${this.state.x2Pos})`}}>
						<Avatar width="150px" height="150px" img={a.img} />
						<Health hp={a.hp} color="crimson" />
					</div>
				</div>
			);
		}
	}

	slideInAnonymousFighters(opponent) {
		this.setState({
			type:'crossSparks',
			color:'crimson',
			opponent,
			position:'absolute',
			x2Pos:'5000px',
			right:'100px',
			hideOpponents: true,
			textColor:"crimson",
			text:'Fight!'},
			() => this.remainingFighters(false))
	}

	removeChosenFighter() {
		const theFighters = this.state.theFighters;
		const remainingFighters = theFighters.filter(fighter => fighter.name !== this.state.chosenFighter.name);
		this.setState({remainingFighters});
	}

	remainingFighters(boolean) {
		const removeFighter = this.state.remainingFighters;
		const remainingFighters = removeFighter.filter( person => person.name !== this.state.opponent.name);
		this.setState({remainingFighters, showAtkPoints:boolean})
	}

	renderRemainingFighters() {
		const currentOpponent = this.state.opponent;
		const counterAtk = Math.floor(Math.random()*20)+4
		return this.state.remainingFighters.map(opponent =>
			<div
				key={opponent.name}
			 	style={{...styles,cursor:'pointer',border:'2px solid dodgerblue', borderRadius: '50%'}}
				onMouseEnter={() => this.setState({hoverAvatars:true})}
				onMouseLeave={() => this.setState({hoverAvatars:false})}

				 onClick={
				() => currentOpponent.hp <= 0 && this.state.chosenFighter.hp >= 0
					? this.setState({opponent,counterAtk},() => this.remainingFighters())
					: this.remainingFighters(false)
				}>
				<Avatar width="100px" height="100px" img={opponent.img} />
			</div>
		)
	}

	atk() {
		const chosenFighter = this.state.chosenFighter;
		const opponent = this.state.opponent;
		const remainingFighters = this.state.remainingFighters;
		if(chosenFighter !== null && opponent.length !== 0 && opponent.hp >= 0) {
			let atkPower = this.state.atkPower;
			const counterAtk = this.state.counterAtk;

			let fighterHealth = chosenFighter.hp - counterAtk;
			let opponentHealth = opponent.hp - atkPower;

			chosenFighter.hp = fighterHealth;
			opponent.hp = opponentHealth;

			atkPower += this.state.baseAtkPower;
			this.setState({ chosenFighter, opponent, atkPower, showAtkPoints:true, color:'goldenrod' });
		}
		if(chosenFighter.hp <= 0 || chosenFighter.hp === opponent.hp || remainingFighters.length === 0) {
				return () => this.setState({type:'ban', color:'goldenrod'}, () => this.restartGame())
		}
	}

	restartGame() {
		const baseAtkPower = Math.floor(Math.random()*24)
		this.setState({
			hover: false,
			chosenFighter: [],
			opponent: [],
			hideOpponents: false,
			remainingFighters: [],
			counterAtk: Math.floor(Math.random()*24),
			atkPower: 0,
			baseAtkPower,
			theFighters: [
				{name: 'Rick Sanchez', img: rick, hp:120},
				{name: 'Morty Sanchez', img: morty, hp:90},
				{name: 'Poopy', img: poopy, hp:100},
				{name: 'Mr. MeeSeeks', img: meseeks, hp:125},
				{name: 'Beth Sanchez', img:beth, hp:100}
			],
			text: 'Select your fighter',
			type: 'arrowLeft',
			color: '#00b3ca',
			opacity: 1,
			scale: 1,
			xPos: '0px',
			x2Pos: '0px',
			left: '-1000px',
			right: '-1000px',
			showAtkPoints: false,
		})
	}

	renderRestartBtn() {
		if(this.state.chosenFighter.length !== 0 || this.state.opponent.hp <= 0) {
			return <Arrow
				chosenFighter={this.state.chosenFighter}
				onMEnter={() => this.setState({type:'ban', color:"limegreen"})}
				onMLeave={() => this.setState({type:'code', color:"dodgerblue"})}
				color={this.state.color}
				type={this.state.type}
				text={"Play Again?"}
				textColor={'yellow'}
				attack={this.restartGame.bind(this)} />
		} else {
			return <Arrow
				chosenFighter={this.state.chosenFighter}
				onMEnter={this.onMouseEnter.bind(this)}
				onMLeave={this.onMouseLeave.bind(this)}
				color={this.state.color}
				type={this.state.type}
				text={this.state.text}
				textColor={'limegreen'}
				checker={this.checker.bind(this)}
				attack={this.atk.bind(this)} />
		}
	}


	onMouseEnter() {
		if(this.state.opponent.hp <= 0) {
			this.setState({type:'thunderbolt', color:'dodgerblue', hover:true})
		} else {
			this.setState({type:'thunderbolt', color:'red', hover:true})
		}
	}

	onMouseLeave() {
		if(this.state.opponent.hp <= 0 || this.state.chosenFighter.hp <=0 ) {
			this.setState({type:'ban', color:'yellow', hover:false})
		} else {
			this.setState({type:'crossSparks', color:'red', hover:false})
		}
	}

	componentDidMount() {
		const baseAtkPower = Math.floor(Math.random()*24)
		this.setState({baseAtkPower})
	}



  render() {
    return (
      <div style={{position:'relative', height: '100vh'}}>
			<div>
				<Header />
				{
					this.state.chosenFighter.length !== 0 && this.state.chosenFighter.hp >= 0 && this.state.remainingFighters.length === 0 && this.state.opponent.hp <= 0
					? <h1 style={{textAlign:'center', fontFamily:'Permanent Marker', color:'dodgerblue'}}>Winner winner chicken dinner</h1>
					: ''
				}

				<div style={{display:'flex', justifyContent:'space-between', overflow:'hidden'}}>
					<FighterContainer>
						{this.renderFighters()}
						<ChosenFighter
							chosenFighter={this.state.chosenFighter}
							left={this.state.left}
							counterAtk={this.state.counterAtk}
							showAtkPoints={this.state.showAtkPoints} />
					</FighterContainer>

					{
						this.state.chosenFighter.hp <= 0  || this.state.remainingFighters.length === 0 && this.state.opponent.hp <=0
						? this.renderRestartBtn()
						: <Arrow
							chosenFighter={this.state.chosenFighter}
							onMEnter={this.onMouseEnter.bind(this)}
							onMLeave={this.onMouseLeave.bind(this)}
							color={this.state.color}
							type={this.state.type}
							textColor={this.state.textColor}
							text={this.state.text}
							attack={this.atk.bind(this)} />
					}

					<FighterContainer>
							{this.renderAnonymous()}
						<Opponent
							right={this.state.right}
							opponents={this.state.opponents}
							opponent={this.state.opponent}
							atkPower={this.state.atkPower}
							showAtkPoints={this.state.showAtkPoints}
							chosenFighter={this.state.chosenFighter}
							text={ this.state.chosenFighter.hp <= 0 || this.state.remainingFighters.length === 0 ? '' : 'Choose your next opponent'}/>
					</FighterContainer>

				</div>
			</div>

				<div style={{position: 'absolute', bottom: 0, width: '100%'}}>
					{
						this.state.remainingFighters.length !== 0
						? 	<Footer text={"Remaining opponents"}>
								{this.renderRemainingFighters()}
							</Footer>
						: <Footer text={"No remaining opponents here"}>.</Footer>
					}

				</div>

				
			</div>
    );
  }
}

const styles = {
	transition: 'all 1s ease-in'
}

export default App;
