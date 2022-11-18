/*global google*/
import React, {useState, useEffect, useRef} from "react";
import UserServices from "../../services/UserServices";

const Registration = () => {  

function initMap() {
	var mapOptions, map, marker, searchBox,
	infoWindow = '',
	addressEl = document.getElementById( 'map-search' ),
	latEl = document.getElementById( 'latitude' ),
	longEl = document.getElementById( 'longitude' ),
	element = document.getElementById( 'map-canvas' );

mapOptions = {
	zoom: 8,
	center: new google.maps.LatLng( 0,0 ),
	disableDefaultUI: false, // Disables the controls like zoom control on the map if set to true
	scrollWheel: true, // If set to false disables the scrolling on the map.
	draggable: true, // If set to false , you cannot move the map around.
};
map = new google.maps.Map( element, mapOptions ); // Till this like of code it loads up the map.
marker = new google.maps.Marker({
	position: mapOptions.center,
	map: map,
	// icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
	draggable: true
});

 searchBox = new google.maps.places.SearchBox(addressEl);
/**
 * When the place is changed on search box, it takes the marker to the searched location.
 */
google.maps.event.addListener( searchBox, 'places_changed', function () {
	var places = searchBox.getPlaces(),
		bounds = new google.maps.LatLngBounds(),
		i, place, lat, long,
		addresss = places[0].formatted_address;
		console.log(addresss);
		
// eslint-disable-next-line
	for( i = 0; place = places[i]; i++ ) {
		bounds.extend( place.geometry.location );
		marker.setPosition( place.geometry.location );  // Set marker position new.
	}

	map.fitBounds( bounds );  // Fit to the bound
	map.setZoom( 15 ); // This function sets the zoom to 15, meaning zooms to level 15.

	lat = marker.getPosition().lat();
	long = marker.getPosition().lng();
	console.log(lat, long);
	//latEl.value = lat;
	//longEl.value = long;

	setNativeValue(addressEl, addresss);	
	addressEl.dispatchEvent(new Event('input', {bubbles: true}));

	setNativeValue(latEl, lat);	
	latEl.dispatchEvent(new Event('input', { bubbles: true }));
	setNativeValue(longEl, long);
	longEl.dispatchEvent(new Event('input', { bubbles: true }));
	//setMapsData(address);
	if ( infoWindow ) {
		infoWindow.close();
	}
	infoWindow = new google.maps.InfoWindow({
		content: addresss
	});

	infoWindow.open( map, marker );
} );
/**
 * Finds the new position of the marker when the marker is dragged.
 */
google.maps.event.addListener( marker, "dragend", function () {
	var lat, long, address;

	console.log( 'i am dragged' );
	lat = marker.getPosition().lat();
	long = marker.getPosition().lng();

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { latLng: marker.getPosition() }, function ( result, status ) {
		if ( 'OK' === status ) {  // This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
			address = result[0].formatted_address;
			//addressEl.value = address;
			//latEl.value = lat;
			//longEl.value = long;

			setNativeValue(latEl, lat);			
			latEl.dispatchEvent(new Event('input', { bubbles: true }));
			setNativeValue(longEl, long);
			longEl.dispatchEvent(new Event('input', { bubbles: true }));
			//setMapsData(address);

		} else {
			console.log( 'Geocode was not successful for the following reason: ' + status );
		}
		if ( infoWindow ) {
			infoWindow.close();
		}
		infoWindow = new google.maps.InfoWindow({
			content: address
		});

		infoWindow.open( map, marker );
	} );
});
}
window.initMap = initMap;

//  Code start for form check 

	const effectRan = useRef(false);
	
	useEffect(() => {
		if(effectRan.current === false){
		const script = document.createElement('script');
	  
		script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAfL2oULbnrWbl_G-WdVcxGH8TfEme8dhk&libraries=places&callback=initMap";
		script.async = true;  
		document.body.appendChild(script);  
		return () => {
		  document.body.removeChild(script);
		  effectRan.current = true;
		}
	}
	  }, []);


	  function setNativeValue(element, value) {
		const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
		const prototype = Object.getPrototypeOf(element);
		const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
	  
		if (valueSetter && valueSetter !== prototypeValueSetter) {
		  prototypeValueSetter.call(element, value);
		} else {
		  valueSetter.call(element, value);
		}
	  }

	const initialUserService ={
		id: null,
		contactname: "",
		email: "",
		password: "",
		company: "",
		address: "",
		latitude: "",
		longitude: "",
		open: "",
		close: "",
		chargesperhour: "",
		logo: "//ssl.gstatic.com/accounts/ui/avatar_2x.png",
		enabled: true,
	};

	const [users, setUser] = useState(initialUserService);
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	//const [image, setImage] = useState('');
	///let formData = new FormData();

	const handleInputChange = event => {
		// const files = event.target.files;
		// setUser(event.target.files[0]);
		// console.log(files);
		const {name, value} = event.target;
		setUser({...users, [name]: value});	
	};
	
	const saveUser = (e) =>{ 
		e.preventDefault();
		var data = {
			contactname: users.contactname,
			email: users.email,
			password: users.password,
			company: users.company,
			address: users.address,
			latitude: users.latitude,
			longitude: users.longitude,
			open: users.open,
			close: users.close,
			chargesperhour: users.chargesperhour,
			logo: users.logo,
			enabled: users.enabled
			
		}

	UserServices.create(data)
		.then(response => {
			setUser({
				id: response.data.id,
				contactname: response.data.contactname,
				email: response.data.email,
				password: response.data.password,
				company: response.data.company,
				address: response.data.address,
				latitude: response.data.latitude,
				longitude: response.data.longitude,
				open: response.data.open,
				close: response.data.close,
				chargesperhour: response.data.chargesperhour,
				logo: response.data.logo,
				enabled: response.data.enabled
			});
			
			setSubmitted(true);
			setLoading(true);
			//console.log(response.data);
		})
		.catch(e =>{
			//console.log(e);
			setLoading(false);
		})
	};

	const newUser = () => {
		setUser(initialUserService);
		setSubmitted(false);
	};

    return(
		<div className="submit-form">
			{submitted ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className="btn btn-success" onClick={newUser}>
						Add
					</button>
				</div>				
			) : (				
				<div className="container" style={{width: '40rem'}}>
				<div className="card">
				  <div className="card-header text-white bg-info text-center h3">
				  Sitter Registration Form
				  </div>
				  <div className="card-body">
						<div className="form-group row">
							<label htmlFor="contactname" className="col-sm-3 col-form-label font-weight-bold"> Name :</label>
							<div className="col-sm-9">
								<input type="text" id="contactname" name="contactname" className="form-control" value={users.contactname} onChange={handleInputChange} placeholder="Contact name" maxLength="35" />
								<div className="error"></div>
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="email" className="col-sm-3 col-form-label font-weight-bold">Email :</label>
							<div className="col-sm-9">
								<input type="text" name="email" className="form-control" id="email" value={users.email} onChange={handleInputChange} placeholder="Ex: john@gmail.com" maxLength="45" />
								<div className="error"></div>
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="password" className="col-sm-3 col-form-label font-weight-bold">Password :</label>
							<div className="col-sm-9">
								<input type="password" name="password" className="form-control" id="password" value={users.password} onChange={handleInputChange} placeholder="Password" maxLength="64" />
								<div className="error"></div>
							</div>
						</div>
						<div className="form-group row">
						   <label htmlFor="companyname" className="col-sm-3 col-form-label font-weight-bold">Company / Display Name :</label>
							  <div className="col-sm-9">
									   <input type="text" name="company" className="form-control" id="company" value={users.company} onChange={handleInputChange} placeholder="Enter your company name" />
									   <div className="error"></div>
							 </div>
						 </div>
						 <div className="form-group row">
							 <label htmlFor="map-search" className="col-sm-3 col-form-label font-weight-bold">Address :</label>
							   <div className="col-sm-9">
								   <input type="text" name="address" className="form-control" id="map-search" value={users.address} onChange={handleInputChange} placeholder="Enter your full address" />
								   <div className="error"></div>
							 </div>
						 </div>
						 
						 <div className="form-group row">
							 <label htmlFor="location" className="col-sm-3 col-form-label font-weight-bold">Location :</label>
							   <div className="col-sm-9">
									   {/* Google map canvas */}
									<div id="map-canvas"></div>
										<div className="row"> 
											 <div className="form-group col-sm-6">
												  <label htmlFor="lat" className="font-weight-bold col-form-label">Latitude :</label>
													  <input type="text" name="latitude" id="latitude" className="form-control latitude" value={users.latitude} onChange={handleInputChange} placeholder="Latitude" readOnly />
											 </div>
											  <div className="form-group col-sm-6">
												  <label htmlFor="lng" className="font-weight-bold col-form-label">Longitude :</label>
													  <input type="text" name="longitude" id="longitude" className="form-control longitude" value={users.longitude} onChange={handleInputChange} placeholder="Longitude" readOnly />
											 </div>
										 </div>
									 
									 <div className="row">
										  <div className="form-group col-sm-6">
												  <label htmlFor="opentime" className="font-weight-bold col-form-label">Opening Hour's :</label>
													  <input type="text" name="open" id="open" value={users.open} onChange={handleInputChange} className="form-control" placeholder="Open" />
										 </div>
										 <div className="form-group col-sm-6">
												  <label htmlFor="closetime" className="font-weight-bold col-form-label">Closes Hour's :</label>
													  <input type="text" name="close" id="close" value={users.close} onChange={handleInputChange} className="form-control" placeholder="Closes" />
										 </div>
									 </div>
								 </div>
						 </div>	
						 
						 <div className="form-group row">
							 <label htmlFor="chargesperhour" className="col-sm-3 col-form-label font-weight-bold">Charges :</label>
							   <div className="col-sm-7">
									 <div className="input-group mb-3">
									  <input type="text" name="chargesperhour" id="chargesperhour" className="form-control" value={users.chargesperhour} onChange={handleInputChange} placeholder="Enter your one hour charges" aria-label="Recipient's username" aria-describedby="basic-addon2" />
									  <div className="input-group-append">
										<span className="input-group-text font-weight-bold" id="basic-addon2">/hr</span>
									  </div>
									</div>
								   <div className="error"></div>
							 </div>
						 </div>
						 
						   {/* <div className="form-group row">
							   <label className="col-sm-3 col-form-label font-weight-bold"></label>
								   <div className="col-sm-6"> */}
									   <input type="text" name="logo" className="" id="imagefile" value={users.logo} onChange={handleInputChange} style={{display: "none"}} />
								   {/* <div className="error"></div>
								   </div>
						</div> */}
						<input type="hidden" name="enabled" id="enabled" className="form-control" value={users.enabled} onChange={handleInputChange} />
								 
						<button className="btn btn-primary" disabled={loading} onClick={saveUser}>
						{loading && (
							<span className="spinner-border spinner-border-sm"></span>
						)}
						<span>Submit</span>
						</button>
						{/* <button  className="btn btn-success">Submit</button> */}
				  </div>
				</div>
			  </div>
			)}
		</div>
    );
}
export default Registration;
