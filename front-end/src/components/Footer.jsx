import React from 'react';
import logo from '../data/logo.png';

function Footer() {
  return (
    <footer className="flex p-4 items-center space-x-52">
      <img src={logo} alt="logo" className="w-20 h-10" />
      <p className="text-xs text-slate-400">© 2022-2022 Construindo Patrimônios</p>
    </footer>
  );
}

export default Footer;
