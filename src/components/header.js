import React, { useState } from 'react'

import { Link } from "gatsby"
import { navigate } from "gatsby" 
import PropTypes from "prop-types"

import Typography from "typography"

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import getParam from "../services/getParam"

import { login,logout, isAuthenticated, getProfile }  from "../services/auth"

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },



  toolbarTitle: {
    flexGrow: 1,
	'@media (max-width: 768px)' : {
		   width:'100%',
		   display: 'block' 
	}	  	
  },

  

  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const Header = ({ siteTitle,search }) => {
	
    

	const { inmonth } = search
	const { inyear } = search
	var rmonth
	var ryear

	
	if (!inmonth) 
		rmonth=new Date().getMonth()+1
	else
		rmonth= inmonth

	if (!inyear) 
		if(new Date().getFullYear()> 2020 ||new Date().getFullYear()< 2019){
			ryear= 2020
			rmonth=12
		}
		else
			ryear= new Date().getFullYear()
	else
		ryear= inyear
	
	const [reportyear, setYear] = useState(ryear);  
	const [reportmonth, setMonth] = useState(rmonth);  
	
	
	function handleYearChange(e) {
		setYear(e.target.value);
		navigate(`/dashboard/mView?inmonth=`+reportmonth+`&inyear=`+e.target.value)	
	}

	function handleMonthChange(e) {
		setMonth(e.target.value);
		navigate(`/dashboard/mView?inmonth=`+e.target.value+`&inyear=`+reportyear)	

	}	
	
    function buildYearOptions() {
		
        var arr = [];
	    var  YearNames = ["2019", "2020"];
		var selected ="";
        for (let i = 1; i <= 2; i++) {
			if(YearNames[i-1]==ryear)
				arr.push(<option key={i}  value={YearNames[i-1]} selected>{YearNames[i-1]}</option>)
			else	
				arr.push(<option key={i}  value={YearNames[i-1]}>{YearNames[i-1]}</option>)
            
        }

        return arr; 
    }	
	
    function buildMonthOptions() {
       var arr = [];
	   var  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   	   var selected ="";
        for (let i = 1; i <= 12; i++) {
			if(i==rmonth)
				arr.push(<option key={i} value={i} selected>{monthNames[i-1]}</option>)
			else	
				arr.push(<option key={i} value={i}>{monthNames[i-1]}</option>)
            
        }

        return arr; 
    }
	
			
	function handleDate(move){
		if(move=="TODAY"){
				rmonth=new Date().getMonth()+1;
				ryear= new Date().getFullYear();
		}

		if(move=="PREV"){
				rmonth=reportmonth;
				ryear= reportyear;
				if(rmonth ==1){
					rmonth= 12;
					ryear= ryear-1;
				}else{
					rmonth=rmonth-1;
				}				
		}		
		if(move=="NEXT"){
				rmonth=reportmonth;
				ryear= reportyear;

				if(rmonth ==12){
					rmonth= 1;
					ryear= ryear+1;
				}else{
					rmonth=rmonth+1;
				}		

		}		
		if(ryear<2019){
			ryear=2019;
			rmonth=1;
		}				
		if(ryear>2020){
			ryear=2020;
			rmonth=12;
		}						
		
		if(rmonth<1) rmonth= 1;
		if(rmonth>12) rmonth= 12;
		
		if(ryear==new Date().getFullYear()&&rmonth>(new Date().getMonth()+1)||ryear>new Date().getFullYear()){
				rmonth=new Date().getMonth()+1;
				ryear=new Date().getFullYear();			
		}
		
		setYear(ryear);				
		setMonth(rmonth);				
		
		navigate(`/dashboard/mView?inmonth=`+rmonth+`&inyear=`+ryear)		
	}
	const classes = useStyles()
	
	let greetingMessage = ""
	 if (isAuthenticated()) {
	greetingMessage = 'Executive Reporting Dashboard'
	} else {
	greetingMessage = "You are not logged in"
	}
	return(
	  <header
		style={{
		  background: `#779ECB`,
		  marginBottom: `0.25 rem`,
		}}
	  >
		<AppBar position="static">
         <nav>
		  
		<span style={{fontSize:25}} className={classes.toolbarTitle}>
			<Link
			  to="/"
			  style={{
				color: `white`,
				textDecoration: `none`,
			  }}
			>
			  {siteTitle} {greetingMessage}
			</Link>
		</span>
		{isAuthenticated() ? (
		
		<span style={{float:'right',display: "flex",
          justifyContent: "center",
          alignItems: "center"}} className={classes.toolbarTitle}>
			
		  <select id='selectMonth' name='selectMonth' onChange={handleMonthChange}>
			{buildMonthOptions()}
		  </select>
		  <select id='selectYear' name='selectYear' onChange={handleYearChange}>
			{buildYearOptions()}
		  </select> 
          <a
            href="/"
			style={{ textDecoration: 'none',color: 'inherit' }}
            onClick={event => {
               event.preventDefault()
               handleDate('TODAY')
            }}
          >
           &nbsp;Today
          </a>
		  
          <a
            href="/"
			style={{ textDecoration: 'none',color: 'inherit' }}
            onClick={event => {
              event.preventDefault()
               handleDate('PREV')
              
            }}
			
			className={classes.link}
          >
            <ArrowLeftIcon fontSize="large"/>
          </a>
		
          <a
            href="/"
			style={{ textDecoration: 'none',color: 'inherit' }}
            onClick={event => {
              event.preventDefault()
               handleDate('NEXT')

            }}
			
			className={classes.link}
          >
            <ArrowRightIcon fontSize="large"/>
          </a>

          <a
            href="/"
			 style={{ textDecoration: 'none',color: 'inherit' }}
            onClick={event => {
              event.preventDefault()
              //logout(() => navigate(`/login`))
			  logout()
			  login()
            }}
			className={classes.link}
          >
            Logout
          </a>
		  </span>
		
		  
		): null}
		
		
		</nav>
	  </AppBar>
	  </header>
	)
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
export default getParam(Header)


