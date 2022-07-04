import styled from 'styled-components';

interface IProps {
	onControl: boolean;
    currentTime : number;
    playVideo : boolean;
}

function ControlBox({ onControl, currentTime, playVideo }: IProps) {
	return (
        <Container onControl={onControl}> 
            ControlBox
        </Container>
    )
};

export default ControlBox;

const Container = styled.div<{ onControl: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 13%;
	z-index: 100;
	background: linear-gradient(to bottom, rgba(80, 80, 80, 0), #222222);
	transition: all 0.5s;
	pointer-events: none;
	padding: 0px 10px;
	/* opacity : ${({ onControl }) => (onControl ? '1' : '0')} */
`;


