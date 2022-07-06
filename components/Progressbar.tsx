import styled from 'styled-components';

interface Props {
	onProgressChange: (progress: number) => void;
	onMouseUp: () => void;
	onMouseDown: () => void;
	value: number;
	max: number;
}

function Progressbar({
	onProgressChange,
	onMouseUp,
	onMouseDown,
	value,
	max,
}: Props) {
	const percentNum = (value / max || 0) * 100;
	const percent = `${percentNum}%`;
	return (
		<ProgressBarBox>
			<Prebar style={{width: percent}}>
				<ProgressBar
					onChange={(e) => onProgressChange(parseInt(e.target.value, 10))}
					onMouseOver={onMouseUp}
					onMouseLeave={onMouseDown}
					type="range"
					min="0"
					max="100"
					value={percentNum}
				/>
			</Prebar>
		</ProgressBarBox>
	);
}

export default Progressbar;

const ProgressBarBox = styled.div`
	width: 95%;
	height: 5px;
	margin: 20px auto;
	background-color: gray;
	border-radius: 3px;
	cursor: pointer;
`;

const Prebar = styled.div`
	position: relative;
	height: 5px;
	background-color: white;
	border-radius: 3px;
`;

const ProgressBar = styled.input`
	-webkit-appearance: none !important;
	position: absolute;
	top: 0px;
	margin: 0;
	width: 100%;
	height: 5px;
	background-color: transparent;
	border-radius: 1.5px;
	cursor: pointer;

	&::-webkit-slider-thumb {
		-webkit-appearance: none !important;
		width: 13px;
		height: 13px;
		border: solid 0.5px #e6e6e6;
		border-radius: 50%;
		background-color: white;
	}
`;

