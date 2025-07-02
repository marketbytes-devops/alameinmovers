import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import { FaChevronDown, FaPowerOff, FaBars, FaTimes } from 'react-icons/fa';

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    setUserRole(role);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCustomersOpen(false);
    setIsJobsOpen(false);
  };

  const toggleCustomersDropdown = () => {
    setIsCustomersOpen(!isCustomersOpen);
    setIsJobsOpen(false);
  };

  const toggleJobsDropdown = () => {
    setIsJobsOpen(!isJobsOpen);
    setIsCustomersOpen(false);
  };

  const isActive = (path) => location.pathname === path;

const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
    console.log("Initiating logout from Topbar, refresh token:", !!refreshToken);

    const clearStorage = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      navigate('/login');
    };

    if (!refreshToken) {
      console.warn("No refresh token found, clearing storage and redirecting");
      clearStorage();
      return;
    }

    apiClient
      .post('/auth/logout/', { refresh: refreshToken })
      .then(() => {
        console.log('Logout successful');
        clearStorage();
      })
      .catch((error) => {
        console.error('Logout error:', error.response?.data || error.message);
        clearStorage();
      });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-end h-24">
          <div className="flex justify-between items-center">
            <Link to="/">
              <svg
                width="87"
                height="50"
                viewBox="0 0 87 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1321_3169)">
                  <path
                    d="M86.6856 0H-0.00114441V40.4375H86.6856V0Z"
                    fill="#000272"
                  />
                  <path
                    d="M3.32777 49.9278H2.21115V42.5687H3.32777V49.9278Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M10.9686 42.5605V49.9285H9.79924L6.64808 44.6601V49.9285H5.53146V42.5605H6.70084L9.84672 47.8289V42.5605H10.9686Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M17.1722 42.5605V43.6771H15.6124V49.9285H14.4906V43.6771H12.9308V42.5605H17.174H17.1722Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M22.9892 42.5604V43.677H20.348V45.6746H22.3878V46.7913H20.348V48.81H22.9892V49.9266H19.2296V42.5586H22.9892V42.5604Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M30.1357 49.9285H28.8749L27.2624 46.823H26.0015V49.9285H24.8849V42.5605H27.6035C28.1908 42.5605 28.692 42.7698 29.107 43.1883C29.5255 43.6033 29.7347 44.1062 29.7347 44.697C29.7347 45.1296 29.6134 45.5253 29.369 45.8823C29.1316 46.2322 28.8221 46.4889 28.437 46.6542L30.1357 49.9285ZM27.6017 45.7064C27.8796 45.7064 28.1187 45.6062 28.3174 45.4075C28.5126 45.2123 28.6111 44.9749 28.6111 44.697C28.6111 44.4192 28.5126 44.1748 28.3174 43.9761C28.1187 43.7774 27.8796 43.6771 27.6017 43.6771H25.9998V45.7064H27.6017Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M37.1881 42.5605V49.9285H36.0187L32.8675 44.6601V49.9285H31.7509V42.5605H32.9203L36.0662 47.8289V42.5605H37.1881Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M44.8347 42.5605V49.9285H43.7128V48.2087H41.2105L40.1238 49.9285H38.7997L43.4596 42.5605H44.8347ZM41.9157 47.0921H43.7128V44.2557L41.9157 47.0921Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M51.129 42.5605V43.6771H49.5693V49.9285H48.4474V43.6771H46.8876V42.5605H51.1308H51.129Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M54.3181 49.9278H53.2015V42.5687H54.3181V49.9278Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M57.3013 48.8989C56.5663 48.1638 56.1988 47.2793 56.1988 46.2419C56.1988 45.2044 56.5663 44.3199 57.3013 43.5848C58.0364 42.8498 58.9209 42.4823 59.9584 42.4823C60.9959 42.4823 61.8804 42.8498 62.6154 43.5848C63.3504 44.3199 63.7179 45.2044 63.7179 46.2419C63.7179 47.2793 63.3504 48.1638 62.6154 48.8989C61.8804 49.6339 60.9959 50.0014 59.9584 50.0014C58.9209 50.0014 58.0364 49.6339 57.3013 48.8989ZM58.0944 44.3779C57.5792 44.8931 57.3224 45.5139 57.3224 46.2419C57.3224 46.9699 57.5792 47.5906 58.0944 48.1058C58.6096 48.621 59.2304 48.8778 59.9584 48.8778C60.6864 48.8778 61.3071 48.621 61.8223 48.1058C62.3375 47.5906 62.5943 46.9699 62.5943 46.2419C62.5943 45.5139 62.3375 44.8931 61.8223 44.3779C61.3071 43.8627 60.6864 43.6059 59.9584 43.6059C59.2304 43.6059 58.6096 43.8627 58.0944 44.3779Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M71.0047 42.5605V49.9285H69.8353L66.6841 44.6601V49.9285H65.5675V42.5605H66.7369L69.8828 47.8289V42.5605H71.0047Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M78.6488 42.5605V49.9285H77.5269V48.2087H75.0246L73.9379 49.9285H72.6138L77.2737 42.5605H78.6488ZM75.7298 47.0921H77.5269V44.2557L75.7298 47.0921Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M82.0768 42.5605V48.8118H84.718V49.9285H80.9584V42.5605H82.075H82.0768Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M46.342 7.85494L41.0824 16.0054L35.8247 7.86901L35.837 17.8694L41.0877 24.1717L46.3543 17.8483L46.342 7.85494Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M33.08 3.21796L36.0694 3.21445L41.0758 10.964L46.0856 3.20038L49.0732 3.19686L49.0891 14.5671L54.6317 7.91305L49.0961 1.48412H32.8919L27.5427 7.91305L33.0959 14.5794L33.08 3.21796Z"
                    fill="#FFD31D"
                  />
                  <path
                    d="M19.4021 19.2286L16.3899 19.2321L15.1537 16.4959L13.9175 13.7598L10.6679 6.6011L7.43757 13.7686L11.5893 13.7633L12.8255 16.4995L6.20841 16.5083L4.97925 19.2479L1.96701 19.2514L9.1591 3.27234L12.1713 3.26882L19.4021 19.2303V19.2286Z"
                    fill="#FFFBEF"
                  />
                  <path
                    d="M30.255 16.4771L30.2585 19.215L23.9843 19.2238L21.2464 19.2273L21.2429 16.4894L21.2253 3.27985L23.9632 3.27633L23.9808 16.4859L30.255 16.4771Z"
                    fill="#FFFBEF"
                  />
                  <path
                    d="M70.3899 19.1622L67.3777 19.1657L66.1415 16.4296L64.9053 13.6934L61.6557 6.53474L58.4254 13.7022L62.5771 13.6969L63.8133 16.4331L57.1962 16.4419L55.9671 19.1816L52.9548 19.1851L60.1434 3.20598L63.1557 3.20246L70.3864 19.164L70.3899 19.1622Z"
                    fill="#FFFBEF"
                  />
                  <path
                    d="M84.579 14.5795C84.579 15.3251 84.4595 15.9986 84.2168 16.5999C83.9741 17.2013 83.6277 17.7113 83.1811 18.1298C82.7327 18.5483 82.1893 18.8719 81.551 19.1022C80.9127 19.3308 80.197 19.4469 79.4074 19.4469C78.1448 19.4469 77.0194 19.2482 76.0294 18.8473C75.0394 18.4463 74.2253 17.9874 73.5869 17.4704L75.4773 15.5748C75.9802 16.0302 76.5429 16.3801 77.1671 16.6228C77.547 16.774 77.9057 16.8725 78.2398 16.9182C78.5739 16.9639 78.8482 16.985 79.061 16.985C79.4567 16.985 79.8171 16.9341 80.1442 16.8356C80.4713 16.7371 80.7562 16.6035 80.9988 16.4347C81.5158 16.0531 81.7726 15.5519 81.7726 14.9277C81.7726 14.5478 81.6354 14.2049 81.3611 13.9007C81.1465 13.658 80.874 13.4611 80.5381 13.3081C80.2638 13.1569 79.9754 13.0356 79.6712 12.9441C79.367 12.8527 79.0927 12.77 78.85 12.6944C78.7744 12.6645 78.7058 12.6452 78.6443 12.6381C78.5827 12.6311 78.53 12.6118 78.4842 12.5819C78.4543 12.5819 78.4086 12.5678 78.3471 12.5361C78.027 12.4447 77.5663 12.2864 76.9667 12.0596C76.3653 11.8328 75.7674 11.5215 75.1748 11.1259C73.7892 10.2009 73.0963 9.05968 73.0946 7.70567C73.0946 6.80885 73.2475 6.05096 73.5588 5.4355C73.87 4.82004 74.2762 4.31712 74.7774 3.9285C75.2786 3.53988 75.8378 3.26204 76.4532 3.09323C77.0687 2.92618 77.6736 2.84001 78.2662 2.84001C79.3617 2.84001 80.2814 2.96662 81.027 3.22336C81.7726 3.48185 82.3652 3.73858 82.8083 3.99708C83.0369 4.13424 83.2303 4.26612 83.3903 4.39625C83.5504 4.52461 83.691 4.64243 83.8124 4.7497L81.8763 6.7139C81.4648 6.30417 81.0463 5.99293 80.6208 5.78015C79.9807 5.4777 79.3125 5.32471 78.6126 5.32647C78.3084 5.32647 78.0042 5.36516 77.7 5.44253C77.3957 5.5199 77.1302 5.61838 76.9016 5.73971C76.2334 6.15119 75.8993 6.69279 75.8993 7.36101C75.8993 7.77249 76.0365 8.12066 76.3108 8.41081C76.5077 8.63941 76.782 8.84339 77.1337 9.02627C77.4221 9.1775 77.7281 9.29883 78.0464 9.39027C78.3664 9.48171 78.6618 9.56436 78.9362 9.63997L79.2105 9.70855C79.2861 9.73844 79.4303 9.78416 79.6448 9.84571C79.8576 9.90726 80.109 9.99694 80.3974 10.1183C80.6858 10.2396 81.0023 10.3838 81.3452 10.5509C81.6881 10.7179 82.0258 10.9149 82.3616 11.1435C83.8387 12.1159 84.5773 13.2624 84.579 14.5848V14.5795Z"
                    fill="#FFFBEF"
                  />
                  <path
                    d="M17.1646 23.8267L17.1839 38.9952L14.6113 38.9987L14.5972 28.2018L9.65595 35.8616L4.71468 28.2158L4.72875 39.0128L2.07524 39.0163L2.05589 23.8478L4.94504 23.8443L9.64892 31.1261L14.3563 23.832L17.1646 23.8285V23.8267Z"
                    fill="#FFFBEF"
                  />
                  <path
                    d="M26.7156 23.5137C27.7883 23.5137 28.7994 23.7142 29.749 24.1204C30.7003 24.5266 31.5303 25.0823 32.2372 25.7892C32.9458 26.4961 33.5033 27.3243 33.913 28.2739C34.321 29.2234 34.5267 30.2345 34.5285 31.3072C34.5285 32.3799 34.328 33.391 33.9218 34.3405C33.5156 35.2919 32.9599 36.1219 32.253 36.8288C31.5461 37.5374 30.7179 38.0948 29.7683 38.5046C28.8187 38.9125 27.8076 39.1183 26.735 39.12C25.6623 39.12 24.6512 38.9196 23.6999 38.5134C22.7485 38.1072 21.9186 37.5515 21.2117 36.8446C20.503 36.1377 19.9456 35.3094 19.5358 34.3599C19.1279 33.4103 18.9221 32.3992 18.9204 31.3265C18.9204 30.2539 19.1208 29.2428 19.527 28.2932C19.9333 27.3419 20.4889 26.5119 21.1958 25.805C21.9027 25.0963 22.731 24.5389 23.6805 24.1292C24.6301 23.7212 25.6412 23.5155 26.7139 23.5137H26.7156ZM26.7191 26.0863C26.0193 26.0863 25.3546 26.22 24.7268 26.4855C24.0973 26.751 23.5346 27.1344 23.0352 27.6338C22.5358 28.1349 22.1542 28.6994 21.8904 29.3289C21.6266 29.9585 21.4948 30.6232 21.4965 31.323C21.4965 32.0229 21.6302 32.6911 21.8957 33.3277C22.1612 33.9642 22.5446 34.5305 23.044 35.0299C23.5451 35.5293 24.1096 35.9073 24.7391 36.1641C25.3686 36.4208 26.0333 36.5474 26.7332 36.5474C27.4331 36.5474 28.1013 36.4173 28.7379 36.1588C29.3727 35.9003 29.9406 35.5222 30.44 35.0211C30.9394 34.5199 31.3175 33.9519 31.5742 33.3154C31.831 32.6788 31.9576 32.0106 31.9576 31.3107C31.9576 30.6108 31.8275 29.9461 31.569 29.3184C31.3105 28.6906 30.9306 28.1261 30.4312 27.6267C29.9301 27.1273 29.3621 26.7458 28.7255 26.482C28.089 26.2182 27.4208 26.0863 26.7209 26.0881L26.7191 26.0863Z"
                    fill="#FFFBEF"
                  />
                  <path
                    d="M39.7042 39.0608L33.6815 23.8255L36.4687 23.822L41.0494 35.2432L45.2785 23.8114L48.0217 23.8079L42.4685 39.0573L39.7025 39.0608H39.7042Z"
                    fill="#FFFBEF"
                  />
                  <path
                    d="M51.9936 26.3747L51.9988 30.0182L57.5942 30.0112L58.2414 32.5821L52.0023 32.5909L52.0076 36.2344L59.5321 36.2238L59.5356 39.0409L49.4385 39.055L49.4192 23.8038L59.5162 23.7898L59.5198 26.3624L51.9953 26.373L51.9936 26.3747Z"
                    fill="#FFFBEF"
                  />
                  <path
                    d="M72.3419 29.1566C72.3419 29.7 72.2681 30.217 72.1186 30.7111C71.9691 31.2035 71.7616 31.6589 71.4979 32.0739C71.2341 32.4889 70.9123 32.8652 70.5342 33.2011C70.1562 33.5369 69.7376 33.813 69.2805 34.0275L72.3525 39.0268L69.2875 39.0304L66.5601 34.5656H64.8017L65.8479 31.9948H66.9628C67.7348 31.993 68.3995 31.7134 68.9551 31.1542C69.2119 30.8834 69.4123 30.5757 69.5548 30.231C69.6972 29.8881 69.7675 29.5312 69.7675 29.1584C69.7675 28.7873 69.6954 28.4304 69.5513 28.0875C69.4071 27.7446 69.2066 27.4456 68.9499 27.1871C68.3924 26.6315 67.726 26.3519 66.9558 26.3536L63.9119 26.3572V27.7727L63.9189 31.9965L63.9224 34.5692L63.9277 39.0374L61.3551 39.0409L61.3498 34.5727L61.341 27.7762L61.3357 23.788L66.9523 23.781C67.6943 23.781 68.3924 23.9217 69.0431 24.2066C69.6937 24.4914 70.2617 24.8765 70.7488 25.3619C71.2359 25.8472 71.621 26.4152 71.9093 27.0641C72.196 27.7147 72.3402 28.411 72.3402 29.1531L72.3419 29.1566Z"
                    fill="#FFFBEF"
                  />
                  <path
                    d="M84.7388 34.4778C84.7388 35.1776 84.6263 35.8107 84.3977 36.3752C84.1691 36.9396 83.8455 37.4197 83.4235 37.8136C83.0032 38.2075 82.4915 38.5117 81.8919 38.7262C81.2923 38.9407 80.6205 39.0498 79.8767 39.0498C78.6897 39.0498 77.6329 38.8634 76.7027 38.4853C75.7725 38.109 75.0075 37.6764 74.4079 37.1911L76.1857 35.4098C76.6587 35.8371 77.1863 36.1659 77.7736 36.3945C78.1305 36.5369 78.4664 36.6284 78.7812 36.6723C79.0959 36.7145 79.3527 36.7356 79.5531 36.7356C79.9242 36.7356 80.2636 36.6882 80.5713 36.595C80.879 36.5018 81.1463 36.3769 81.3749 36.2186C81.8602 35.8617 82.1029 35.3887 82.1029 34.8031C82.1029 34.4461 81.9728 34.1243 81.716 33.8395C81.5156 33.6109 81.2571 33.4262 80.9441 33.2838C80.6873 33.1413 80.4148 33.027 80.1282 32.9426C79.8415 32.8565 79.5848 32.7791 79.3562 32.707C79.2841 32.6789 79.2208 32.6613 79.1628 32.6543C79.1047 32.6472 79.0555 32.6296 79.0133 32.6015C78.9852 32.6015 78.9412 32.5874 78.8849 32.5593C78.5842 32.4731 78.1516 32.3254 77.5872 32.1109C77.0227 31.8981 76.4618 31.6045 75.9026 31.2334C74.6013 30.363 73.9489 29.2921 73.9472 28.0207C73.9472 27.1784 74.0914 26.4662 74.3833 25.8877C74.6752 25.3092 75.0568 24.8361 75.528 24.4721C75.9993 24.1064 76.5233 23.8461 77.1018 23.6879C77.6804 23.5296 78.2484 23.4505 78.8058 23.4505C79.8345 23.4505 80.6997 23.5701 81.3995 23.811C82.0994 24.0536 82.6568 24.2945 83.0736 24.5372C83.2881 24.6656 83.471 24.7904 83.6205 24.9118C83.7699 25.0331 83.9036 25.1439 84.0179 25.2441L82.1979 27.0905C81.811 26.7054 81.4189 26.4135 81.0179 26.213C80.4183 25.9282 79.7888 25.7857 79.1311 25.7875C78.8445 25.7875 78.5596 25.8244 78.273 25.8965C77.9864 25.9686 77.7367 26.0618 77.5239 26.1761C76.8961 26.563 76.5813 27.0712 76.5831 27.6989C76.5831 28.084 76.7132 28.4129 76.97 28.6837C77.1564 28.8982 77.4131 29.0899 77.7419 29.2622C78.0127 29.4046 78.2994 29.5189 78.6001 29.6033C78.9007 29.6877 79.1786 29.7669 79.4371 29.8372L79.6938 29.9005C79.7659 29.9286 79.9013 29.9726 80.1018 30.0289C80.3022 30.0851 80.5379 30.1713 80.8087 30.2856C81.0795 30.3999 81.3767 30.5353 81.6985 30.6918C82.0203 30.8483 82.3385 31.0347 82.6533 31.2475C84.0407 32.1601 84.7353 33.2381 84.7371 34.4813L84.7388 34.4778Z"
                    fill="#FFFBEF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1321_3169">
                    <rect width="86.6867" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>

          <div className="bg-secondary text-black font-semibold hidden md:flex flex-1 justify-center space-x-10 py-[13px]">
            {(userRole === 'user' || userRole === 'superadmin') && (
              <>
                <div className="relative">
                  <button
                    onClick={toggleCustomersDropdown}
                    className={`flex items-center transition-colors duration-200 text-md ${
                      isActive('/add-customer-form') || isActive('/manage-customers')
                        ? 'text-primary'
                        : 'hover:text-primary'
                    }`}
                  >
                    CUSTOMERS
                    <FaChevronDown className="ml-2 w-4 h-3" />
                  </button>
                  {isCustomersOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                      <Link
                        to="/add-customer-form"
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          isActive('/add-customer-form') ? 'bg-gray-200 font-bold' : ''
                        }`}
                        onClick={() => setIsCustomersOpen(false)}
                      >
                        Add Customer
                      </Link>
                      <Link
                        to="/manage-customers"
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          isActive('/manage-customers') ? 'bg-gray-200 font-bold' : ''
                        }`}
                        onClick={() => setIsCustomersOpen(false)}
                      >
                        Manage Customers
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={toggleJobsDropdown}
                    className={`flex items-center transition-colors duration-200 text-md ${
                      isActive('/add-job') || isActive('/manage-jobs')
                        ? 'text-primary'
                        : 'hover:text-primary'
                    }`}
                  >
                    JOBS
                    <FaChevronDown className="ml-2 w-4 h-3" />
                  </button>
                  {isJobsOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                      <Link
                        to="/add-job"
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          isActive('/add-job') ? 'bg-gray-200 font-bold' : ''
                        }`}
                        onClick={() => setIsJobsOpen(false)}
                      >
                        Add Job
                      </Link>
                      <Link
                        to="/manage-jobs"
                        className={`block px-4 py-2 hover:bg-gray-100 ${
                          isActive('/manage-jobs') ? 'bg-gray-200 font-bold' : ''
                        }`}
                        onClick={() => setIsJobsOpen(false)}
                      >
                        Manage Jobs
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
            {(userRole === 'admin' || userRole === 'superadmin') && (
              <Link
                to="/enquiries"
                className={`flex items-center transition-colors duration-200 text-md ${
                  isActive('/enquiries') ? 'text-primary' : 'hover:text-primary'
                }`}
              >
                ENQUIRIES
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center transition-colors duration-200 text-md hover:text-primary"
            >
              <FaPowerOff className="w-[16px] h-[16px] mr-2" />
              <span>Logout</span>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-[#FFD31D] focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-secondary text-black font-semibold">
            {(userRole === 'user' || userRole === 'superadmin') && (
              <>
                <button
                  onClick={toggleCustomersDropdown}
                  className={`block px-4 py-2 w-full text-left hover:bg-gray-100 ${
                    isActive('/add-customer-form') || isActive('/manage-customers')
                      ? 'bg-gray-200 font-bold'
                      : ''
                  }`}
                >
                  CUSTOMERS
                </button>
                {isCustomersOpen && (
                  <div>
                    <Link
                      to="/add-customer-form"
                      className={`block px-4 py-2 pl-8 hover:bg-gray-100 ${
                        isActive('/add-customer-form') ? 'bg-gray-200 font-bold' : ''
                      }`}
                      onClick={toggleMenu}
                    >
                      Add Customer
                    </Link>
                    <Link
                      to="/manage-customers"
                      className={`block px-4 py-2 pl-8 hover:bg-gray-100 ${
                        isActive('/manage-customers') ? 'bg-gray-200 font-bold' : ''
                      }`}
                      onClick={toggleMenu}
                    >
                      Manage Customers
                    </Link>
                  </div>
                )}
                <button
                  onClick={toggleJobsDropdown}
                  className={`block px-4 py-2 w-full text-left hover:bg-gray-100 ${
                    isActive('/add-job') || isActive('/manage-jobs')
                      ? 'bg-gray-200 font-bold'
                      : ''
                  }`}
                >
                  JOBS
                </button>
                {isJobsOpen && (
                  <div>
                    <Link
                      to="/add-job"
                      className={`block px-4 py-2 pl-8 hover:bg-gray-100 ${
                        isActive('/add-job') ? 'bg-gray-200 font-bold' : ''
                      }`}
                      onClick={toggleMenu}
                    >
                      Add Job
                    </Link>
                    <Link
                      to="/manage-jobs"
                      className={`block px-4 py-2 pl-8 hover:bg-gray-100 ${
                        isActive('/manage-jobs') ? 'bg-gray-200 font-bold' : ''
                      }`}
                      onClick={toggleMenu}
                    >
                      Manage Jobs
                    </Link>
                  </div>
                )}
              </>
            )}
            {(userRole === 'admin' || userRole === 'superadmin') && (
              <Link
                to="/enquiries"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  isActive('/enquiries') ? 'bg-gray-200 font-bold' : ''
                }`}
                onClick={toggleMenu}
              >
                ENQUIRIES
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
            >
              <FaPowerOff className="w-6 h-6 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Topbar;