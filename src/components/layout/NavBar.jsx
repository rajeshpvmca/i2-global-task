import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    window.location.href = '/';
    localStorage.clear();
    setIsModalOpen(false);
  };

  return (
    <div className="navbar navbar-expand-lg navbar-dark header_bg py-3 fixed-top  px-0 px-lg-5 px-md-5 ">
      <div className="container-fluid px-3 px-lg-5 px-md-5">
        <h4 className="ps-2" data-aos="fade-right">Keep Notes</h4>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarCollapse"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 ">
            <li className="nav-item px-3">
              <NavLink className="nav-link text-black">
                About
              </NavLink>
            </li>

            <li className="nav-item px-3">
              <NavLink to="/notes" className="nav-link text-black">
                Notes
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink className="nav-link text-black">
                Account
              </NavLink>
            </li>
            <li className="nav-item px-3">
              <NavLink className="nav-link text-black" onClick={() => setIsModalOpen(true)}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>

        {/* logout modal */}
        <Modal maskClosable={false} title={<div className='d-flex'><LogoutOutlined className='col-auto me-1 my-auto' /><div className='col my-auto'>Logout</div></div>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              No
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Yes
            </Button>]}>
          <p>Are you sure you want to Logout?</p>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
