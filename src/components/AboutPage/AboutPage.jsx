'use client';
import Image from 'next/image';
import React from 'react';
import ContactForm from './ContactForm';

const AboutPage = () => {
  return (
    <div className="mx-auto p-8 w-full">
      <h1 className="text-4xl font-bold text-center mb-8">About <span className=' text-primary'>Skill Joiner</span></h1>

     

      <div className="mb-8">
        <p className=' leading-8'>
          Skill Joiner is a platform dedicated to connecting people with the
          right skills and expertise. Whether you are looking for developers,
          designers, or other professionals, Skill Joiner helps you find the
          right talent for your projects.
        </p>
      </div>
      <h1 className="text-2xl font-bold mb-8">About <span className=' text-primary'>Developers</span></h1>
      <div className="flex justify-around items-center mb-8">
        
        <div className="text-cente mx-8">
          <Image
            height={200}
            width={200}
            src="/abdullah.jpg"
            alt="Abdullah"
            className="mb-2 mx-auto rounded-2xl shadow-lg"
          />
          <p className="font-bold text-center">Abdullah</p>
          <p className="text-gray-600 text-center">Full-Stack Developer</p>
          <p className="mt-2 leading-8">
          As a full-stack developer at Skill Joiner, and I'm really good at using Next.js, React.js, and MongoDB. 
          I'm committed to creating strong solutions that make sure users can have a smooth and easy time with our platform.
          </p>
        </div>

        <div className="text-cente mx-8">
        <Image
            height={200}
            width={200}
            src="/abbas.jpg"
            alt="abbas"
            className="mb-2 mx-auto rounded-2xl shadow-lg"
          /> 
          <p className="font-bold text-center">Abbas Mushtaq</p>
          <p className="text-gray-600 text-center">Front-end Developer</p>
          <p className="mt-2 leading-8">
          As a front-end developer at Skill Joiner, where my main focus is making attractive interfaces with React.js. I love making websites that are fun and easy for people to use, to make our platform even better.
          </p>
        </div>
      </div>

<ContactForm/>
      {/* <div>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form className="text-center">
          <label className="block mb-4">
            Name:
            <input
              type="text"
              name="name"
              className="border rounded px-2 py-1"
            />
          </label>

          <label className="block mb-4">
            Email:
            <input
              type="email"
              name="email"
              className="border rounded px-2 py-1"
            />
          </label>

          <label className="block mb-4">
            Message:
            <textarea
              name="message"
              rows="4"
              className="border rounded px-2 py-1"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default AboutPage;
