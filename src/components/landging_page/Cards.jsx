/** @format */

import React, { useEffect, useState } from 'react';

const Cards = () => {
  const arrdata = [
    {
      dimg: 'https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_instant_video_consulation.png',
      title: 'Instant Video Consultation',
      title2: 'Connect within  60 secs',
      background: ' #AFCFED',
    },
    {
      dimg: 'https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_find_doctors.png',
      title: 'Find Doctors Near You',
      title2: 'Confirmed appointments',
      background: ' #98CBD6',
    },
    {
      dimg: 'https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_medicines.png',
      title: 'Medicines',
      title2: 'Essentials at your doorstep',
      background: ' #CCD0DB',
    },
    {
      dimg: 'https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_lab_tests.png',
      title: 'Lab Tests',
      title2: 'Sample pickup at your home',
      background: ' #AFCFED',
    },
    {
      dimg: 'https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_surgeries.png',
      title: 'Surgeries',
      title2: 'Safe and trusted surgery centers',
      background: ' #D5D8FC',
    },
  ];

  const [arr,setArr]=useState([]);
  const [country,Setcountry]=useState("in");
  const [pageSize,setPageSize]=useState(4);
  const [page,setPage]=useState(1);
  const [q,setQ]=useState("everything");
  const [loader,setLoader]=useState(true);

  useEffect(()=>{
    setLoader(true);
    if(country&&q)
      getNews(`https://newsapi.org/v2/top-headlines?q=${q}country=${country}&pageSize=${pageSize}&page=${page}&apiKey=faa66530b2cf4a658d67d49a15a05023`);
      else if(country)
      getNews(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=faa66530b2cf4a658d67d49a15a05023`);
    else
    getNews(`https://newsapi.org/v2/top-headlines?q=${q}&pageSize=${pageSize}&page=${page}&apiKey=faa66530b2cf4a658d67d49a15a05023`)

  },[country,pageSize,q,page])

  async function getNews(url) {
    try {
      let req = await fetch(url);
      let res = await req.json();
      if (res.error) alert(res.error);
      else {
        setArr(res.articles);
        setLoader(false)
      }
      // console.log(res);
    } catch (e) {
      setLoader(true);
      alert(e);
    }
  }

  if (loader) return <h1 style={{ color: 'red' }}>404 Error</h1>;

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '80%',
        // border: 'solid black',
        textAlign: 'center',
        flexWrap: 'wrap',
        gap: '30px',
        margin: 'auto',
        justifyContent: 'center',
      }}>
      {arr.map((e) => {
        const {name,id,author,title,url}=e.source;
        return (
          <div
            style={{
              borderRadius: '20px',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            }}>
            <div
              style={{
                height: '170px',
                width: '200px',
                background: e.background,
                paddingTop: '12px',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingBottom: '0px',
                //   borderRadius: '20px',
                // border: 'solid black',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
              }}>
              <img
                style={{ height: '100%', width: '100%' }}
                src={url}
                alt={id}
              />
            </div>
            <div
              style={{
                height: '120px',
                width: '200px',
                // border: 'solid black',
                paddingTop: '20px',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
              }}>
              <div
                style={{
                  fontSize: ' 20px',
                  fontFamily: 'Lato,Helvetica,Arial,sans-serif!important',
                  color: ' #2d2d32',
                  fontWeight: '700',
                  textAlign: 'left',
                  paddingLeft: '10px',
                }}>
                {author}
              </div>
              <div
                style={{
                  fontSize: ' 14px',
                  fontWeight: '400',
                  color: '#787887',
                  fontFamily: 'Lato,Helvetica,Arial,sans-serif!important',
                  paddingTop: '10px',
                  textAlign: 'left',
                  paddingLeft: '10px',
                }}>
                {title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
