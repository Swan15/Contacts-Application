'use client'
import mapboxgl from 'mapbox-gl'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

// Temporary access token
mapboxgl.accessToken =
	'pk.eyJ1IjoiYWxleHNub3dudXQiLCJhIjoiY2xsdjFiNzU2MXUyNDNlcHBheWV0bm1meiJ9.B20YQgiZ3V1Ikgb5t796og'

interface Props {
	lng: number
	lat: number
}

export default function Map({ lng, lat }: Props): JSX.Element {
	const mapContainer = useRef(null)
	const map: MutableRefObject<null | mapboxgl.Map> = useRef(null)
	const [marker, setMarker] = useState<null | mapboxgl.Marker>(null)

	useEffect(() => {
		if (map.current) {
			map.current.panTo([lng, lat])
			marker?.setLngLat([lng, lat])
			return
		}  // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: 2,
		})
		const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current)
		setMarker(newMarker)
	}, [lng, lat])

	return (
		<div className="mt-4">
			<div ref={mapContainer} className="h-[260px] rounded-xl" />
		</div>
	)
}
