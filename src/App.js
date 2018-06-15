import React, { Component } from 'react';
import { ReactiveBase, CategorySearch, SingleRange, ResultCard, ReactiveList } from '@appbaseio/reactivesearch';
import ReactMpxPlayer from '@telemundo/react-mpx-player';

class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			currentVideo: "P4R_3ErslAOQ"
		}

	}

	handleVidClick(mediaId) {
		this.setState({currentVideo: mediaId})

	}

	picClicked(){

	}
	render() {


		return (


			<ReactiveBase
				app="YouMundo"
				credentials="6Ook2nnnU:1e9d454b-f3d2-4b8c-96f2-e25a0f84969b">
        <CategorySearch

          componentId="searchbox"
          dataField={["title", "description"]}
					innerClass={{
							title: 'text-title',
							input: 'text-input'
					}}
//           categoryField="brand.raw"
// placeholder="Search for cars"
        />
				<ReactMpxPlayer
				 className="GallerySliderVideo"
				 width="100%"
				 height="650"
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
				  componentId="SearchResult"
				  dataField="title"
				  // stream={true}
				  // pagination={false}
				  // paginationAt="bottom"
				  // pages={5}
				  // sortBy="desc"
				  // size={10}
				  loader="Loading Results.."
				  // showResultStats={true}
				  onData={
						(res) =>
					   <div>
							 	<ul>
									<li key={res.id} onClick={(e) => this.handleVidClick(res.mediaId) }>
										{res.title}
										<img src= {res.image} alt={res.description} height="100" width="100"></img>
									</li>
								</ul>
						 </div>
						}
				  onResultStats={(total, took) => {
				    return "found " + total + " results in " + took + "ms."
				  }}
				  react={{
				    or: ["searchbox"]
				  }}
				/>

				<div>
					Hello ReactiveSearch!
				</div>


			</ReactiveBase>


		) // End of render return;
	}
}
export default App;
