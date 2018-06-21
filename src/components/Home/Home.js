import React, { Component } from 'react';
import { ReactiveBase,DataSearch, CategorySearch, ReactiveList } from '@appbaseio/reactivesearch';
import ReactMpxPlayer from '@telemundo/react-mpx-player';
import PropTypes from 'prop-types';
import MiniDrawer from '../MiniDrawer.js'
import SimpleMediaCard from '../SimpleMediaCard.js'
import Grid from '@material-ui/core/Grid';

class Home extends Component {

	constructor(props){
		super(props)
		this.state = {
			currentVideo: "P4R_3ErslAOQ",
			currentTitle: "\"Abrazos no muros\", el amor invade la frontera México-EEUU",
			currentDescription: "La frontera entre EEUU y México se abrió para que 100 familias se reencontraran después de muchos años por apenas tres minutos"
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
			<MiniDrawer>
			<ReactiveBase
				app="YouMundo"
				credentials="6Ook2nnnU:1e9d454b-f3d2-4b8c-96f2-e25a0f84969b">
				<DataSearch
					className="search-bar"
					width="80%"
				  componentId="SearchSensor"
				  dataField={["keywords", "title", "description"]}
				/>
				<ReactMpxPlayer
					 className="GallerySliderVideo"
					 height="80%"
					 width="80%"
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
							 	
								 	<SimpleMediaCard
				           	key={res.mediaId}
									 	title={res.title}
				           	keywords={res.keywords}
				           	onClick={(e) => this.handleVidClick(res.mediaId) }
				           	image={res.image}
				           	description={res.description}
				         	/>


						 }
						 onResultStats={(total, took) => {
							 return "found " + total + " results in " + took + "ms."
						 }}
						 react={{
							 and: ["SearchSensor"]
						 }}
					 />
			</ReactiveBase>
			</MiniDrawer>

		) // End of render return;
	}
}

// Home.propTypes = {
// 	handleVidClick: PropTypes.func.isRequired,
// 	app: PropTypes.shape({
// 		currentVideo: PropTypes.string.isRequired
// 	})
// }


export default Home;
