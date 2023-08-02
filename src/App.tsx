import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AccountProvider } from './context/Provider';

import AccountHome from './page/Home/AccountHome';
import AccountProfile from './page/AccountProfile/AccountProfie';
function App() {
	return (
		<BrowserRouter>
			<div className='flex flex-col h-screen'>
				<div className='flex-none h-auto bg-green-600 p-5'>
					<h1 className='font-mono font-medium text-5xl ml-10 text-white'>NCR</h1>
				</div>
				<div className='flex-none h-auto bg-white p-5'>
					<h2 className='font-sans font-light text-base text-black text-center'>Cuenta sueldo</h2>
					<h3 className='font-sans font-medium text-3xl text-black text-center pt-3'>Selecciona la Cuenta a Consultar</h3>
				</div>
				<AccountProvider>
					<Routes>
						<Route path='/' element={<AccountHome />} />
						<Route path='/account/:numberAccount' element={<AccountProfile />} />
					</Routes>
				</AccountProvider>
				<div className='flex-none h-auto'>
					<Link
						to={'/'}
						className='w-28 h-16 bg-green-600 flex flex-col text-center justify-center rounded-md cursor-pointer m-3 text-white'
					>
						Salir
					</Link>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
