import React from 'react';


const nav = ({onroutechange,issighin}) =>{
	if(issighin){
		return(
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
				<p onClick={()=>onroutechange('sighout')}className='f3 link dim black underline pa3 pointer'>Sign out</p>
			</nav>
			)
		}else
		{
		return(
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
				<p onClick={()=>onroutechange('sighin')}className='f3 link dim black underline pa3 pointer'>Sign in</p>
				<p onClick={()=>onroutechange('Register')}className='f3 link dim black underline pa3 pointer'>Register</p>
			</nav>
			)
		}		
}

export default nav;