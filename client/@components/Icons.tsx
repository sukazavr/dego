import React from 'react'
import { style } from 'typestyle'

const pack = (el: React.ReactNode) => (props: React.HTMLProps<HTMLDivElement>) => (
	<div className={$ico} {...props}>
		{el}
	</div>
)

export const IcoTime = pack(
	<svg role="img" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
		<title>Total playtime in hours</title>
		<path d="m19.8 3.8c8.9 0 16.2 7.2 16.2 16.2s-7.3 16.3-16.2 16.3-16.3-7.3-16.3-16.3 7.3-16.2 16.3-16.2z m0 31.1c8.2 0 14.9-6.7 14.9-14.9s-6.7-14.9-14.9-14.9-15 6.7-15 14.9 6.7 14.9 15 14.9z m0-14.9v-10h1.3v11.3h-8.8v-1.3h7.5z" />
	</svg>
)

export const IcoMultiplayer = pack(
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20.06" fill="currentColor">
		<title>Multiplayer</title>
		<g>
			<circle cx="13.5" cy="12.5" r="0.5" />
			<circle cx="14.5" cy="11.5" r="0.5" />
			<polygon points="6 11 5 11 5 12 4 12 4 13 5 13 5 14 6 14 6 13 7 13 7 12 6 12 6 11" />
			<circle cx="14.5" cy="13.5" r="0.5" />
			<circle cx="15.5" cy="12.5" r="0.5" />
			<path d="M8.85,4.59A4,4,0,0,1,10.1,7.48,1.45,1.45,0,0,1,10,8h2.88a.54.54,0,0,0,.55-.52A3.23,3.23,0,0,0,10.1,4.36,3.51,3.51,0,0,0,8.85,4.59Z" />
			<ellipse cx="10" cy="1.82" rx="1.9" ry="1.82" />
			<ellipse cx="14.57" cy="1.82" rx="1.9" ry="1.82" />
			<path d="M2.57,8H8.29a.55.55,0,0,0,.57-.52A3.28,3.28,0,0,0,5.43,4.36,3.28,3.28,0,0,0,2,7.48.55.55,0,0,0,2.57,8Z" />
			<ellipse cx="5.43" cy="1.82" rx="1.9" ry="1.82" />
			<path d="M13.42,4.59a4,4,0,0,1,1.25,2.89,1.45,1.45,0,0,1-.1.52h2.88A.54.54,0,0,0,18,7.48a3.23,3.23,0,0,0-3.33-3.12A3.52,3.52,0,0,0,13.42,4.59Z" />
			<path d="M16,9.06,10,9,4,9S1,9,0,18a2,2,0,0,0,2,2c2,0,4-3,4-3h8s2,3.06,4,3.06a2,2,0,0,0,2-2C19,9,16,9.06,16,9.06ZM7,13H6v1H5V13H4V12H5V11H6v1H7Zm7.5-2a.5.5,0,1,1-.5.5A.5.5,0,0,1,14.5,11Zm-1,2a.5.5,0,1,1,.5-.5A.5.5,0,0,1,13.5,13Zm1,1a.5.5,0,1,1,.5-.5A.5.5,0,0,1,14.5,14Zm1-1a.5.5,0,1,1,.5-.5A.5.5,0,0,1,15.5,13Z" />
		</g>
	</svg>
)

export const IcoCoop = pack(
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" fill="currentColor">
		<title>Co-op</title>
		<g>
			<path
				d="M927.53,679.345c-36.948-28.966-74.099-57.695-111.75-85.737c-69.628-51.859-143.95-96.158-221.487-135.094
		c-4.428-2.224-10.284-4.393-14.713-3.35c-20.398,4.803-37.78,12.35-52.189,30.785c-32.173,41.159-73.411,69.051-129.003,67.172
		c-23.491-0.794-37.911-15.998-34.885-39.205c1.607-12.321,5.285-25.122,11.213-35.964c10.535-19.268,23.369-37.292,35.486-55.675
		c6.308-9.569,13.137-18.794,20.868-29.792c-41.773-5.289-81.147-9.765-113.788-36.459
		c-48.024,85.439-94.683,168.449-140.972,250.801c15.474,18.941,29.952,36.663,44.695,54.708
		c16.69-17.874,35.921-22.278,58.251-16.763c23.064,5.696,35.464,22.535,45.867,43.496c16.475-26.608,36.853-45.329,69.366-34.791
		c35.341,11.456,49.963,38.22,48.103,74.982c20.218,1.329,36.333,9.251,49.161,24.248c13.101,15.315,16.813,33.345,15.802,52.885
		c28.604,1.074,48.683,13.975,60.681,38.544c12.509,25.614,6.558,49.034-14.362,73.405c33.035,7.069,62.31,14.606,92.032,19.343
		c30.934,4.93,55.385-7.182,73.043-35.614c-34.827-16.788-68.31-32.91-101.773-49.072c-7.549-3.645-14.516-8.366-9.609-17.965
		c4.793-9.376,12.38-6.895,20.135-3.081c32.931,16.193,65.321,33.806,99.323,47.347c14.355,5.717,32.657,5.395,48.343,2.816
		c16.06-2.641,19.04-19.153,22.008-33.291c2.779-13.238-9.007-14.462-16.155-19.189c-7.742-5.12-15.999-9.465-24.046-14.123
		c-30.916-17.898-62.007-35.507-92.573-53.983c-4.528-2.737-7.713-9.239-9.225-14.642c-0.583-2.085,5.048-8.25,8.157-8.485
		c4.786-0.363,10.28,2.014,14.709,4.558c41.587,23.888,83.267,47.633,124.36,72.35c17.42,10.478,34.204,7.164,50.409-0.026
		c13.842-6.141,16.9-19.908,18.886-34.234c1.909-13.773-7.37-17.579-16.038-22.787c-31.458-18.901-62.932-37.779-94.374-56.707
		c-17.6-10.596-35.508-20.751-52.446-32.32c-3.76-2.568-4.024-10.257-5.898-15.588c5.915-1.192,12.014-3.847,17.688-3.131
		c4.895,0.618,9.318,5.053,13.931,7.833c49.464,29.811,98.891,59.684,148.398,89.423c24.722,14.85,53.81,7.017,63.318-16.831
		C953.742,711.917,948.283,695.616,927.53,679.345z"
			/>
			<path
				d="M767.139,352.24c-83.351-22.124-166.833-17.556-250.276-1.867c-12.96,2.437-29.538,6.691-36.556,16.031
		c-30.802,40.987-59.355,83.735-87.099,126.89c-5.351,8.323-3.416,21.329-4.843,32.176c10.293,1.162,20.883,4.477,30.825,3.104
		c37.501-5.177,67.299-26.029,88.405-55.548c16.558-23.159,37.663-33.279,63.081-40.415c11.297-3.172,20.093-2.334,30.493,2.832
		c120.666,59.936,230.587,136.097,334.667,221.05c7.206,5.881,12.73,6.526,19.148,1.282c22.167-18.114,44.1-36.515,66.377-55.017
		c-47.525-84.528-93.468-166.243-140.253-249.455C842.425,371.551,804.588,362.18,767.139,352.24z"
			/>
			<path
				d="M1146.24,560.227c-24.108-41.962-47.637-84.256-71.328-126.456
		c-32.065-57.116-64.042-114.282-96.206-171.342c-2.46-4.365-6.107-8.061-9.249-12.127c-4.191,2.199-6.849,3.413-9.328,4.922
		c-22.546,13.721-44.844,27.868-67.684,41.079c-10.138,5.864-10.464,11.431-4.951,21.177
		c56.56,99.987,112.786,200.165,168.796,300.462c4.958,8.877,9.294,10.812,18.219,5.093c21.802-13.971,43.837-27.635,66.348-40.419
		C1151.79,576.406,1152.03,570.306,1146.24,560.227z"
			/>
			<path
				d="M307.536,296.284c-22.84-13.211-45.141-27.355-67.688-41.074c-2.476-1.507-5.135-2.715-8.964-4.719
		c-2.488,2.724-5.439,5.128-7.326,8.188c-4.356,7.066-8.175,14.462-12.248,21.704c-52.469,93.306-104.835,186.67-157.572,279.824
		c-5.718,10.101-5.576,16.182,5.359,22.394c22.509,12.786,44.545,26.446,66.352,40.407c8.896,5.695,13.251,3.843,18.224-5.065
		c55.999-100.296,112.221-200.469,168.77-300.457C317.937,307.773,317.701,302.164,307.536,296.284z"
			/>
			<path
				d="M400.797,681.945c-18.054-12.796-35.442-9.747-49.352,9.06c-22.076,29.847-44.14,59.709-65.723,89.91
		c-4.372,6.118-6.594,13.773-8.064,16.951c-0.441,22.096,11.374,38.64,28.643,44.775c16.19,5.751,27.177,1.514,39.701-15.539
		c22.262-30.313,44.731-60.479,66.565-91.099C424.883,718.732,419.267,695.036,400.797,681.945z"
			/>
			<path
				d="M479.302,775.543c-7.147-14.039-18.891-22.069-39.132-23.315c-3.184,1.477-11.809,2.744-15.651,7.711
		c-21.232,27.453-42.23,55.191-61.398,84.097c-10.66,16.075-1.628,39.552,16.328,50.512c18.24,11.134,33.892,7.904,47.001-10.061
		c17.014-23.315,33.741-46.84,50.741-70.165C486.348,801.759,485.932,788.566,479.302,775.543z"
			/>
			<path
				d="M505.902,829.021c-3.614,2.154-12.265,4.783-16.981,10.601c-13.839,17.075-26.707,35.028-38.815,53.388
		c-9.526,14.445-2.102,37.891,14.086,48.971c17.794,12.181,35.054,9.914,47.585-6.603c10.943-14.424,21.471-29.162,32.334-43.647
		c9.716-12.956,9.275-26.658,1.955-39.999C538.552,838.038,526.665,830.006,505.902,829.021z"
			/>
			<path
				d="M285.334,672.719c-18.041-12.742-35.293-10.072-48.463,7.576c-6.432,8.619-13.211,17.031-18.95,26.096
		c-3.522,5.564-5.373,12.186-6.459,14.753c-0.192,22.453,12.566,39.311,30.419,44.659c11.766,3.525,22.773,2.246,30.857-7.35
		c9.117-10.822,17.577-22.286,25.414-34.075C308.794,708.37,302.624,684.93,285.334,672.719z"
			/>
		</g>
	</svg>
)

const $ico = style({
	lineHeight: 0,
	$nest: {
		'& svg, & img': {
			width: '1.5em',
			height: '1.5em',
		},
	},
})