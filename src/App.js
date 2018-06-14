import React, { Component } from 'react';
import { ReactiveBase, CategorySearch, SingleRange, ResultCard } from '@appbaseio/reactivesearch';

class App extends Component {

	render() {
		return (
			<ReactiveBase
				app="YouMundo"
				credentials="6Ook2nnnU:1e9d454b-f3d2-4b8c-96f2-e25a0f84969b">
        <CategorySearch
          componentId="searchbox"
          dataField="title"
//           categoryField="brand.raw"
// placeholder="Search for cars"
        />
        <ResultCard
				  componentId="result"
				  title="Results"
				  dataField="title"
				  // from={0}
				  // size={5}
				  pagination={true}
				  react={{
				    and: ["searchbox", "ratingsfilter"]
				  }}
				  onData={(res) => {
				    return {
				      image: res.image,
				      title: res.title,
				      // description: res.brand + " " + "★".repeat(res.title)
				    }
				  }}
				/>
				<div>
					Hello ReactiveSearch!
				</div>
			</ReactiveBase>

		);
	}
}
export default App;
