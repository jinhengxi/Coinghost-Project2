import styled from 'styled-components';
import { FaPlay, FaPause, FaVolumeMute } from 'react-icons/fa';
import {
	AiFillSound,
	AiOutlineFullscreenExit,
	AiOutlineFullscreen,
	AiOutlineMore,
} from 'react-icons/ai';
import ProgressBar from '../components/Progressbar';
import { useState } from 'react';

interface IProps {
	handlePlaying: () => void;
	onProgressChange: (percent: number) => void;
	showControlBox: boolean;
	currentTime: number;
	playing: boolean;
	startTime: number;
	totalTime: number;
	videoElement: HTMLVideoElement | null;
}

function ControlBox({
	handlePlaying,
	onProgressChange,
	showControlBox,
	currentTime,
	playing,
	startTime,
	totalTime,
	videoElement,
}: IProps) {
	const [volumeClicked, setVolumeClicked] = useState(0);

	const toTimeString = (second: number) => {
		const date = new Date(second * 1000);
		const mm = date.getUTCMinutes();
		const ss = date.getSeconds();
		const formattedMinute = mm + ':';
		const formattedSecond = (ss < 10 ? '0' : '') + ss;
		return formattedMinute + formattedSecond;
	};

	const handleVolume = (value: number) => {
		if (videoElement) {
			videoElement.muted = false;
			const setVolume = value;
			videoElement.volume = setVolume;
			setVolumeClicked(setVolume);
			console.log(setVolume);
		}
	};

	const handleFullScreen = () => {
		if (videoElement?.requestFullscreen) videoElement.requestFullscreen();
	};

	return (
		<Container showControlBox={showControlBox}>
			<ControlBar>
				<PlayTime>
					<span onClick={handlePlaying}>
						{playing ? <FaPause /> : <FaPlay />}
					</span>
					<TimeBox>
						{toTimeString(startTime)}
						<span>/</span>
						{toTimeString(totalTime)}
					</TimeBox>
				</PlayTime>
				<IconBox>
					<Sounds>
						<Soundsbar
							type="range"
							min="0"
							max="1"
							step="0.1"
							value={volumeClicked}
							onChange={(e) => handleVolume(+e.target.value)}
						/>
						{volumeClicked !== 0 ? <AiFillSound /> : <FaVolumeMute />}
					</Sounds>
					{/* <AiOutlineFullscreenExit/> */}
					<span onClick={handleFullScreen}>
						<AiOutlineFullscreen />
					</span>
					<span>
						<AiOutlineMore />
					</span>
				</IconBox>
			</ControlBar>
			<ProgressBar
				onProgressChange={onProgressChange}
				max={totalTime}
				value={currentTime}
			/>
		</Container>
	);
}

export default ControlBox;

const Container = styled.div<{ showControlBox: boolean }>`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 13%;
	background: linear-gradient(to bottom, rgba(80, 80, 80, 0), black);
	transition: all 0.5s;
	padding: 0px 10px;
	/* opacity : ${({ showControlBox }) => (showControlBox ? '1' : '0')} */
`;

const ControlBar = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const PlayTime = styled.div`
	display: flex;
	align-items: center;
	color: white;
	margin-left: 25px;

	span {
		cursor: pointer;
	}
`;

const TimeBox = styled.div`
	margin-left: 10px;

	span {
		margin: 0 3px;
	}
`;

const Soundsbar = styled.input`
	margin-right: 10px;
	display: none;
	cursor: pointer;
	overflow: hidden;
`;

const Sounds = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;

	&:hover {
		${Soundsbar} {
			display: block;
		}
	}
`;

const IconBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 15px;
	font-size: 20px;
	color: white;

	span {
		margin: 0 10px;
		cursor: pointer;
	}
`;
