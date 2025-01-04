import styled from "styled-components";

export const Container = styled.div`
    background-color: hsl(220, 35%, 3%);
    background-image: radial-gradient(at 50% 50%, hsl(210deg 53.55% 26.25% / 50%), hsl(220deg 28.11% 5.65%));    background-repeat: no-repeat;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Container__Form = styled.div`
    background: hsla(220, 35%, 3%, 0.4);
    box-shadow: hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px;
    max-width: 450px;
    
`;