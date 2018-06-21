import React, { Component } from 'react';
import { ReactiveBase,DataSearch, ReactiveList } from '@appbaseio/reactivesearch';
import ReactMpxPlayer from '@telemundo/react-mpx-player';
// import PropTypes from 'prop-types';


let recommendedList = [];
let videosClicked = [];
let lsBoolean;
let lsList;
let searchList;

class Home extends Component {

	constructor(props){
		super(props)
		this.state = {
			currentVideoInfo: {},
			usersLSvideosClicked: [],
			usersLSsearches:[]
		}
	}

	componentWillMount () {
		this.state.usersLSvideosClicked = JSON.parse(localStorage.getItem("videosClicked"));
		this.state.usersLSsearches = JSON.parse(localStorage.getItem("userSearches"));
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
		(lsList ) ? lsBoolean=true : lsBoolean = false;
	}

	// componentWillUpdate(){
	// 	if(recommendedList){
	// 		this.setState({
	// 			usersLSsearches: recommendedList
	// 		})
	// 	}
	// }

	// componentDidMount(){
	// 	console.log(this.state);
	// }

	returnIfMatched(mediaId){
		let matched = false;
		if (lsBoolean ) {
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

	handleVidClick(videoInfo) {
		this.setState({
			currentVideoInfo: videoInfo
		});
		const currentState = this.state;
		videosClicked.push(currentState.currentVideoInfo);
		videosClicked = Array.from(new Set(videosClicked));
		localStorage.setItem('videosClicked', JSON.stringify(videosClicked));
		this.setState({
			usersLSvideosClicked: videosClicked
		});
	}


	compareSearchesToKeywords(data){
		const searchedWords =  this.state.usersLSsearches;
		data.map((val, ind)=>{
				if (ind === 0 ){
					val.keywords.forEach((val2)=>{
						searchedWords.forEach((val3)=>{
							if(val3 === val2){
								const valString = JSON.stringify(val);
								recommendedList.push(valString);
								recommendedList = Array.from(new Set(recommendedList));
							}
						})

					})
				}
			})
			console.log("recommendedList=============");
			console.log(recommendedList);
			return recommendedList

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
			<ul>
				{
						<li  onClick={(e) => this.handleVidClick(videoInfo) }>

						 <img src= {videoInfo.image} height="100" width="100"></img>
					 </li>
					}
			</ul>
		)
	}
	// recommendedList(videoInfo){
	// 	return (
	// 		<ul>
	// 			{
	// 					<li  onClick={(e) => this.(videoInfo) }>
	//
	// 					 <img src= {videoInfo.image} height="100" width="100"></img>
	// 				 </li>
	// 				}
	// 		</ul>
	// 	)
	// }

	render() {
		return (

			<ReactiveBase
				app="YouMundo"
				credentials="6Ook2nnnU:1e9d454b-f3d2-4b8c-96f2-e25a0f84969b">
				<DataSearch
				  componentId="SearchSensor"
				  dataField={["keywords", "title", "description"]}
					onValueSelected={function(value) {
							recommendedList.push(value);
							recommendedList = Array.from(new Set(recommendedList));
							localStorage.setItem('userSearches', JSON.stringify(recommendedList));
							console.log(recommendedList);
							console.log("recommendedList================");

							// this.handleSearch(recommendedList);
	 					}
 					}
				/>
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
				<ReactiveList
					className="video-list"
				  componentId="SearchResult"
				  dataField="title"
				  loader="Loading Results.."
					size = {1000}
				  onAllData={
						(res) =>
						 <div className= "body">
							 <div className= "regular">

								 <h1>Regular</h1>
								 <div className= "list">
									 {res.map((object, ind) => {
										 if(ind < 5) {
											 return (
												 this.Item(object)
											 )
										 }
									 }
									)}
								</div>
							 </div>
								{this.state.usersLSvideosClicked &&
								 <div className= "recently-viewed">
									 <h1>Recently Viewed</h1>
									 <div className="list">
										 { this.state.usersLSvideosClicked.map((object, ind) => {
											 if(ind < 5) {
												 return (
													 this.recentlyViewed(object)
												 )
											 }
										 }
									 )}
									 </div>
								 </div>
								}
								{/* {this.state.usersLSsearches &&
									<div className= "recommended-list">
										<h1>Recommended</h1>
										<div className="list">
											{ recommendedList.map((object, ind) => {
												if(ind < 5) {
													return (
														this.recentlyViewed(object)
													)
												}
											}
										)}
										</div>
									</div>
							} */}

						 </div> //END OF BODY

						}
				  react={{
				    and: ["SearchSensor"]
				  }}
				/>
			</ReactiveBase>
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
