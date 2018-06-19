import React, { Component } from 'react';
import { ReactiveBase,DataSearch, CategorySearch, ReactiveList } from '@appbaseio/reactivesearch';
import ReactMpxPlayer from '@telemundo/react-mpx-player';
import PropTypes from 'prop-types';
class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			currentVideo: "P4R_3ErslAOQ"
		}
	}

	updateInput(key, value) {
		// update react state
		this.setState({ [key]: value });

		// update localStorage
		localStorage.setItem(key, value);
	}
	handleVidClick(mediaId) {
		this.setState({currentVideo: mediaId})
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

				<h1> Welcome to YouMundo</h1>

				<ReactMpxPlayer
					className="GallerySliderVideo"
					width="50%"
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
				<div className="container">
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
										<h2> Most Popular</h2>
										// return <div className="results" key={ind}>{ind}{val}</div>

									})
								}
								<img className="image" src= {res.image} alt={res.description} height="100" width="100"></img>
								<li className = "sResults"  onClick={(e) => this.handleVidClick(res.mediaId) }>
									{res.title}
								</li>
							</div>



						}
						onResultStats={(total, took) => {
							return "found " + total + " results in " + took + "ms."
						}}
						react={{
							and: ["SearchSensor"]
						}}
						/>
					</div>
					<footer>

					</footer>
				</ReactiveBase>
			) // End of render return;
		}
	}

	App.propTypes = {
		handleVidClick: PropTypes.func.isRequired,
		app: PropTypes.shape({
			currentVideo: PropTypes.string.isRequired
		})
	}


	export default App;
