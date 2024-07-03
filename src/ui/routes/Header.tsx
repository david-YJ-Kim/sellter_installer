import { Link } from 'react-router-dom';
import { BasicLinkButton } from '../component/atoms/BasicButton';
import BasicTitle from '../component/atoms/BasicTitle';
import React from 'react';

function NavigationSection() {
  return (
    <div className="mt-2">
      <BasicLinkButton
        destination={'Home'}
        title={'Home'}
        w={'20'}
        text={'sm'}
        textColor={'blue-500'}
        bgColor={'white'}
      />
      <BasicLinkButton
        destination={'BizAccount'}
        title={'사업자 계정'}
        w={'25'}
        text={'sm'}
        textColor={'blue-500'}
        bgColor={'white'}
      />
      <BasicLinkButton
        destination={'KeywordCollection'}
        title={'상품키워드'}
        w={'25'}
        text={'sm'}
        textColor={'blue-500'}
        bgColor={'white'}
      />
      <BasicLinkButton
        destination={'ItemCollection'}
        title={'상품 수집/관리'}
        w={'25'}
        text={'sm'}
        textColor={'blue-500'}
        bgColor={'white'}
      />
      <BasicLinkButton
        destination={'ItemDeploy'}
        title={'상품 등록/관리'}
        w={'25'}
        text={'sm'}
        textColor={'blue-500'}
        bgColor={'white'}
      />
      <BasicLinkButton
        destination={'SalesManagement'}
        title={'판매관리'}
        w={'25'}
        text={'sm'}
        textColor={'blue-500'}
        bgColor={'white'}
      />
    </div>
  );
}

function UserInfoSection() {
  return (
    <div className="flex flex-row justify-between">
      <div className="mx-auto w-16 h-16 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
        <img
          id="image"
          className="object-cover w-full h-16 rounded-full"
          src="image"
        />
      </div>
      <div className="text-gray-600 hover:text-purple-600 p-4">
        <span>DAVID52</span>
      </div>
      <BasicLinkButton
        destination={''}
        title={'LogOut'}
        w={'30'}
        text={'sm'}
        textColor={'blue-500'}
        bgColor={'white'}
      />
    </div>
  );
}

function LogSection() {
  return (
    <Link to="/home">
      <div className="my-3 text-4xl font-bold tracking-wider text-center">
        <a href="#">{'SELLTER'}</a>
      </div>
    </Link>
  );
}

function ViewHeaderSample() {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row ">
        <div className="rounded-md bg-gradient-to-r from-purple-600 to-red-600 w-10 h-10"></div>
        <h1 className="text-2xl text-gray-600 ml-2">Logo</h1>
      </div>
      <div className="mt-2">
        <a href="#" className="text-gray-600 hover:text-purple-600 p-4">
          Home
        </a>
        <a href="#" className="text-gray-600 hover:text-purple-600 p-4">
          Shop
        </a>
        <a href="#" className="text-gray-600 hover:text-purple-600 p-4">
          Blog
        </a>
        <a href="#" className="text-gray-600 hover:text-purple-600 p-4">
          Contact
        </a>
        <a
          href="#"
          className="bg-purple-600 hover:bg-purple-700 text-gray-50 p-3 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Cart (0)
        </a>
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <div id="rootHeader" className="bg-sky-600 text-white">
      <div className="mx-20 flex flex-row justify-between bg-sky-600 text-white">
        <LogSection />
        <NavigationSection />
        <UserInfoSection />
      </div>
    </div>
  );
};

export default Header;
