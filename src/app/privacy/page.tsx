'use client';

import React from 'react';
import { Container, Heading } from '@/components/ui';

const PrivacyPolicy = () => {
  return (
    <Container>
      <Heading>Privacy Policy</Heading>
      <p>Last updated: [Insert Date]</p>

      <h2>1. Introduction</h2>
      <p>
        Carole Kinoti Brands ("we", "our", "us") operates the website and mobile application fotrshop.carolekinoti.co.ke (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
      </p>

      <h2>2. Information Collection and Use</h2>
      <p>
        We collect several different types of information for various purposes to provide and improve our Service to you.
      </p>

      <h3>2.1. Types of Data Collected</h3>

      <h4>Personal Data</h4>
      <p>
        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used 
        to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited 
        to:
      </p>
      <ul>
        <li>Email address</li>
        <li>Name</li>
        <li>Phone number</li> 
        <li>Billing address</li>
        <li>Shipping address</li>
        <li>Payment information (credit card details are not stored directly by us)</li>
      </ul>
      <p>
        You may choose not to provide certain Personal Data, but that may limit your ability to use some features of the Service.
      </p>

      <h4>Usage Data</h4>
      <p>
        We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your device's Internet Protocol (IP) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
      </p>

      <h4>Tracking & Cookies Data</h4>
      <p>
        We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
      </p>
      <p>
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
      </p>

      <h3>2.2. Use of Data</h3>
      <p>
        Carole Kinoti Brands uses the collected data for various purposes:
      </p>
      <ul>
        <li>To provide and maintain our Service</li>
        <li>To notify you about changes to our Service</li>
        <li>To allow you to participate in interactive features of our Service</li>
        {/* Add more list items if necessary */}
      </ul>
    </Container>
  );
};

export default PrivacyPolicy;
