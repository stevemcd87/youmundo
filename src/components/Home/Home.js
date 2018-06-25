import React, { Component } from 'react';
import { ReactiveBase,DataSearch, ReactiveList } from '@appbaseio/reactivesearch';
import ReactMpxPlayer from '@telemundo/react-mpx-player';
import PropTypes from 'prop-types';
import MiniDrawer from '../MiniDrawer.js'
import SimpleMediaCard from '../SimpleMediaCard.js'
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


let recommendedList = [];
let videosClicked = [];
let lsBoolean;
let lsVideoList = [];
let lsSearchedList = [];


class Home extends Component {

	constructor(props){
		super(props)
		this.state = {
			currentVideoInfo: {},
			usersLSvideosClicked: [],
			usersLSsearches:[],
			usersRecommendedList: []
		}
	}

	componentWillMount () {
		this.setState({
			usersLSvideosClicked: JSON.parse(localStorage.getItem("videosClicked"))
		})
		this.setState({
			usersLSsearches: JSON.parse(localStorage.getItem("userSearches"))
		})
		// console.log(this.state);

		this.state.currentVideoInfo = {
		 "title": "\"Abrazos no muros\", el amor invade la frontera México-EEUU",
		 "description": "La frontera entre EEUU y México se abrió para que 100 familias se reencontraran después de muchos años por apenas tres minutos",
		 "airdate": "2016-08-11T22:30:00Z",
		 "mediaId": "P4R_3ErslAOQ",
		 "permalink": "http://now.telemundo.com/video/share/3083345",
		 "vChipRating": "tv-14",
		 "seasonNumber": "2016",
		 "keywords": [
		  "Telemundo,Noticias Telemundo,Información,profesionales,msn,\"Abrazos no muros\",reencuentro frontera México-EEUU"
		 ],
		 "image": "http://stage.telemundo.com/sites/nbcutelemundo/files/images/promo/video_clip/2016/08/11/amor-invade-frontera-de-mexico-y-eeuu.jpg"
		};
		(lsVideoList ) ? lsBoolean=true : lsBoolean = false;
	}

	// componentWillUpdate(){
	// 	if(recommendedList){
	// 		this.setState({
	// 			usersLSsearches: recommendedList
	// 		})
	// 	}
	// }

	componentDidMount(){
		console.log(this.state);
	}

	returnIfMatched(mediaId){
		let matched = false;
		if (lsBoolean ) {
			lsVideoList.forEach((val)=>{
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

	handleVidClick(videoInfo) {
		this.setState({
			currentVideoInfo: videoInfo
		});
		const currentState = this.state;
		videosClicked.unshift(videoInfo);
		videosClicked = Array.from(new Set(videosClicked)).slice(0,2);
		localStorage.setItem('videosClicked', JSON.stringify(videosClicked));
		this.setState({
			usersLSvideosClicked: videosClicked
		});
	}


	compareSearchesToKeywords(data){
		const searchedWords =  this.state.usersLSsearches;
		data.map((val, ind)=>{
			// console.log("val");
			// console.log(val);
				if (val.keywords ){
					val.keywords.forEach((val2)=>{
						// console.log("val2");
						// console.log(val2);
						if (searchedWords){
							searchedWords.forEach((val3)=>{
								if(val3 === val2){
									// console.log("val3");
									// console.log(val3);
									const valString = JSON.stringify(val);
									recommendedList.push(valString);
									recommendedList = Array.from(new Set(recommendedList));
									// recommendedList = JSON.parse(recommendedList);
									console.log(recommendedList);
									// return recommendedList;
									// this.setState({
									// 	usersRecommendedList: recommendedList
									// })
								}
							})
						}
					})
				} else {
					// console.error(val);
				}
			})
			// console.log("recommendedList=============");
			// console.log(recommendedList);
			// return recommendedList

	}


	Item(videoInfo) {
  return (

		<ul onClick={(e)=> this.handleVidClick(videoInfo)} key={JSON.stringify(videoInfo)} >
			<li key={videoInfo.title}>{videoInfo.title}</li>
			<img alt= {videoInfo.title} key= {videoInfo.image} src= {videoInfo.image} className="list-image"></img>
		</ul>
	);
}

	recentlyViewed(videoInfo){
		return (
			<ul key={videoInfo.permalink}>
				{
						<li onClick={(e) => this.handleVidClick(videoInfo) }>
						 <img src= {videoInfo.image} height="100" width="100"></img>
					 </li>
					}
			</ul>
		)
	}

	render() {
	return (
		<div>
			<MiniDrawer>
				<ReactiveBase
					app="YouMundo"
					credentials="6Ook2nnnU:1e9d454b-f3d2-4b8c-96f2-e25a0f84969b"
				>
					<DataSearch
						className="search-bar"
						width="80%"
						componentId="SearchSensor"
						dataField={["keywords", "title", "description"]}
						onValueSelected={function(value) {
								lsSearchedList.push(value);
								lsSearchedList = Array.from(new Set(lsSearchedList));
								localStorage.setItem('userSearches', JSON.stringify(lsSearchedList));
								this.setState({usersLSsearches: lsSearchedList});
						}.bind(this)} />
					<Grid container spacing={16}>
						<Grid item sm={6} >
							<h3 className="headline">Currently Playing</h3>
							<ReactMpxPlayer
								 className="GallerySliderVideo"
								 width="310px"
								 height="300px"
								 style={{marginTop: '10px'}}
								 src={`https://player.theplatform.com/p/0L7ZPC/D7AjRZyan6zo/embed/select/${this.state.currentVideoInfo.mediaId}?autoPlay=true&mute=false`}
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
						</Grid>
					{this.state.usersLSvideosClicked &&
						<Grid item sm={6} >
							<h3 className="headline2">Recently Watched</h3>
							<Grid container spacing={14} >
								{this.state.usersLSvideosClicked.map((video) => {
									return(
										<div className = "container">
										<div className = "list-container">
										<Grid item xs={6} onClick={(e) => {this.handleVidClick(video)}}>
											<ListItem id="list-item" button><SimpleMediaCard title={video.title} image={video.image} /></ListItem>
										</Grid>
									</div>
								</div>
									)
								})}
							</Grid>
						</Grid>
					}
					</Grid>
					{
						<ReactiveList
							className="video-list"
							componentId="SearchResult"
							dataField="title"
							loader="Loading Results.."
							size={120}
							onAllData={
								(res) => {

									return(
										<Grid container spacing={24}>
											<h3 className="headline2">Recently Released</h3>
											{ this.compareSearchesToKeywords(res)}
											{
												res.map( (results, ind) => {
													if(ind < 4){
														return(
														<Grid
															key={results.mediaId}
															item xs={7}
															sm={3}
															onClick={(e) => {this.handleVidClick(results)}}
														>
															{
															<ListItem button>
																<SimpleMediaCard
																	className ="card"
																	title={results.title}
																	image={results.image}
																/>
															</ListItem>
															}
														</Grid>
													)}

												})
											}
											{this.state.usersLSsearches &&
												<div>
													<h1>Recommended</h1>
												<Grid container spacing={16}>


														{
							 							recommendedList.map((object, ind) => {
															const parsedObject = JSON.parse(object);
															return (
																<Grid
																	key={parsedObject.mediaId}
																	item xs={3}

																	onClick={(e) => {this.handleVidClick(parsedObject)}}
																>
																	<ListItem button><SimpleMediaCard title={parsedObject.title} image={parsedObject.image} /></ListItem>
																</Grid>

															)

														}
													)}

												</Grid>
											</div>

									}

										</Grid>

									)
								}
							}

							react={{ and: ["SearchSensor"] }}
						/>
					}
				</ReactiveBase>
			</MiniDrawer>
		</div>
	);
}
}

// Home.propTypes = {
// 	handleVidClick: PropTypes.func.isRequired,
// 	app: PropTypes.shape({
// 		currentVideo: PropTypes.string.isRequired
// 	})
// }


export default Home;
