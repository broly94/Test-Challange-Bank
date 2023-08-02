import AccountComponet from './components/AccountComponent';

function App() {
	return (
		<div className='flex flex-col h-screen'>
			<div className='flex-none h-auto bg-green-600 p-5'>
				<h1 className='font-mono font-medium text-5xl ml-10 text-white'>NCR</h1>
			</div>
			<div className='flex-none h-auto bg-white p-5'>
				<h2 className='font-sans font-light text-base text-black text-center'>Cuenta sueldo</h2>
				<h3 className='font-sans font-medium text-3xl text-black text-center pt-3'>Selecciona la Cuenta a Consultar</h3>
			</div>
			<div className='grow h-auto flex flex-row flex-wrap gap-5 justify-center items-center account-component'>
				<AccountComponet />
			</div>
			<div className='flex-none h-auto'>03</div>
		</div>
	);
}

export default App;
