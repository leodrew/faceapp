import React from 'react';
import './facepicture.css';

const facepicture = ({imageUrl,box}) =>{
	return (		
		<div className='center ma'>
			<div className='absolute m2'>
				<img alt='' id='inputimage' src={imageUrl} width='500px' heigh='auto'/>
				{box.map((regions,key)=>(
					<div  key={key} className='facebox' style={{top:regions.topRow,left:regions.leftCol,right:regions.rightCol,bottom:regions.bottomRow}}></div>
			))}
			</div>
		</div>
	)
}

export default facepicture;