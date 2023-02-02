import React from 'react'
import {useAuth} from "../hooks/login"
import { useEffect, useState } from "react";

export default function Navbar() {
	const user = useAuth()
	return (
		<nav className='flex row'>
			{useAuth()? <div><p>user.name</p></div> : <div><a href="/login/">Enter</a></div> }
		</nav>
	)
}
