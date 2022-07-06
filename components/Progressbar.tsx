import styled from 'styled-components';

interface Props {
	onProgressChange: (progress: number) => void;
	value: number;
	max: number;
}

function Progressbar({
	onProgressChange,
	value,
	max,
}: Props) {
	const percentNum = (value / max || 0) * 100;
	return (
		<ProgressBarBox>
			<Prebar>
				<ProgressBar
					onChange={(e) => onProgressChange(parseInt(e.target.value))}
					type="range"
					min="0"
					max="100"
					step="0.1"
					value={percentNum}
				/>
			</Prebar>
		</ProgressBarBox>
	);
}

export default Progressbar;

const ProgressBarBox = styled.div`
	overflow: hidden;
	height: 7px;
	width: 95%;
	margin: 20px auto;
	border-radius: 1.5px;
	cursor: pointer;
`;

const Prebar = styled.div`
	position: relative;
	height: 7px;
	border-radius: 1.5px;
`;

const ProgressBar = styled.input`
	-webkit-appearance: none !important;
	background: rgba(255, 255, 255, 0.2);
	position: absolute;
	top: -2px;
	width: 100%;
	height: 7px;
	border-radius: 1.5px;
	cursor: pointer;
    
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		cursor: pointer;
		width: 5px;
		box-shadow: -100vw 0 0 100vw white;
		background-color: white;
		border-radius: 50%;
	}
`;
