import React, { Component } from 'react';
import { ReactiveBase,DataSearch, CategorySearch, ReactiveList } from '@appbaseio/reactivesearch';
import ReactMpxPlayer from '@telemundo/react-mpx-player';
import PropTypes from 'prop-types';


let recommendedList = [];
let videosClicked = [];
let lsBoolean;
let lsList;
class Home extends Component {

	constructor(props){
		super(props)
		this.state = {
			currentVideo: "P4R_3ErslAOQ",
			currentKeywords: ["Telemundo,Noticias Telemundo,Información,profesionales,msn,\"Abrazos no muros\",reencuentro frontera México-EEUU"]
		}
	}

	componentWillMount () {
		lsList = JSON.parse(localStorage.getItem("videosClicked"));

		(lsList ) ? lsBoolean=true : lsBoolean = false;
		console.log(lsList);

	}

	returnIfMatched(mediaId){
		let matched = false;
		if (lsBoolean ) {
			console.log(lsList);

			lsList.forEach((val)=>{
				matched = false;
				if(val === mediaId) {
					matched = true;
				}
			})

			if (matched) {
				console.log("return if matched =========");
				return <p>one matched</p>
			}

		}
	}

	handleVidClick(mediaId) {
		this.setState({
			currentVideo: mediaId,
		});
		const currentState = this.state;

		videosClicked.push(currentState.currentVideo);
		videosClicked = Array.from(new Set(videosClicked));
		localStorage.setItem('videosClicked', JSON.stringify(videosClicked));

	}



	render() {
		return (

			<ReactiveBase
				app="YouMundo"
				credentials="6Ook2nnnU:1e9d454b-f3d2-4b8c-96f2-e25a0f84969b">

				<div id= "header">
					<DataSearch
						className="Searchbar"
						componentId="SearchSensor"
						dataField={["keywords", "title", "description"]}
						/>
				</div>

				<h1 id="headline"> Welcome to YouMundo</h1>

				<ReactMpxPlayer
					className="GallerySliderVideo"
					src={`https://player.theplatform.com/p/0L7ZPC/D7AjRZyan6zo/embed/select/${this.state.currentVideo}?autoPlay=true&mute=false`}
					allowFullScreen
					onLoad={() => {
						console.log('Player is Loaded!')
					}}
					onPdkControllerInstalled={pdkController => {
						pdkController.addEventListener('OnMediaStart', () => {
							console.log('Media has started!');
							// Pause the video after 10 seconds of playing
							setTimeout(() => pdkController.pause(true), 10000);
						})
					}}
					/>

					<ReactiveList
						className="video-list"
						componentId="SearchResult"
						dataField="title"
						loader="Loading Results.."
						onData={
							(res) =>
							<div key= {res.mediaId}>
								{
									res.keywords = res.keywords.map((val, ind, arr) => {
										// return <div className="results" key={ind}>{ind}{val}</div>

									})
								}
								<img className="image" src= {res.image} alt={res.description}></img>
								<li className = "sResults"  onClick={(e) => this.handleVidClick(res.mediaId) }>
									{res.title}
								</li>
							</div>



						}
						onResultStats={(total, took) => {
						}}
						react={{
							and: ["SearchSensor"]
						}}
						/>
					<footer>

					</footer>
				</ReactiveBase>

		) // End of render return;
	}
}

Home.propTypes = {
	handleVidClick: PropTypes.func.isRequired,
	app: PropTypes.shape({
		currentVideo: PropTypes.string.isRequired
	})
}


export default Home;
