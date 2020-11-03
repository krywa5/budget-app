import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Wrapper, Button } from 'components';

const WelcomeText = styled.h1`
    color: ${({ theme }) => theme.colors.pink};
    margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const AboutText = styled.p`
    font-size: 20px;
    color: black;
    line-height: 1.1;
`;

const InfoList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.xl}px;
    margin-bottom: 50px;
`;

const InfoCard = styled.li`
    border: 1px solid ${({ theme }) => theme.colors.green.normal};
    padding: ${({ theme }) => theme.spacing.xl}px;
    display: flex;
    flex-direction: column;
    margin: 0;

    img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        object-position: center;
        transition: transform .2s ease-in;

        &:hover {
            transform: scale(1.2);
        }
    }

    h3 {
        margin: ${({ theme }) => theme.spacing.xl}px 0;
        text-align: center;
        color: black;
        text-transform: uppercase;
        font-size: 30px;
    }

    p {
        padding: ${({ theme }) => theme.spacing.xl}px; 
        color: white;
        background-color: ${({ theme }) => theme.colors.green.normal};
        margin: 0;
        font-size: 18px;
        line-height: 1.2;
        text-align: justify;
    }

    button {
        margin: ${({ theme }) => theme.spacing.xl}px auto 0;
    }
`;

const Home = () => {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <WelcomeText>{t('Welcome!')}</WelcomeText>
            <AboutText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima ex omnis qui laborum, necessitatibus quibusdam, velit nam iusto natus perferendis doloremque animi laboriosam? Perspiciatis mollitia sit temporibus illo voluptates itaque, molestiae, odio ratione vitae, veniam non praesentium. Soluta iure, ipsum explicabo culpa provident alias eaque? Harum soluta ea recusandae adipisci accusamus, error laborum sed, molestias dicta esse eius ullam voluptatum quo aut expedita excepturi optio. Doloribus veritatis necessitatibus, aliquam placeat repudiandae nam neque, cum dignissimos iure quidem eligendi amet tenetur porro repellendus soluta? Quia quae libero iusto maxime possimus at adipisci dicta fugiat a impedit explicabo quidem dolores, voluptatibus earum.</AboutText>
            <InfoList>
                <InfoCard>
                    <img src="https://loremflickr.com/400/250" alt="cat" />
                    <h3>Kitty 1</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cumque ad nostrum, vitae alias voluptatem, vero incidunt officia nihil nobis hic exercitationem dignissimos voluptates sequi molestias quisquam! Odio, saepe? Fuga neque ratione voluptates! Debitis esse architecto maxime odit velit praesentium, autem eaque tempora veniam est, illo voluptatum totam impedit. Officiis!</p>
                    <Button>{t('Adopt meh!')}</Button>
                </InfoCard>
                <InfoCard>
                    <img src="https://loremflickr.com/400/250" alt="cat" />
                    <h3>Kitty 2</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cumque ad nostrum, vitae alias voluptatem, vero incidunt officia nihil nobis hic exercitationem dignissimos voluptates sequi molestias quisquam! Odio, saepe? Fuga neque ratione voluptates! Debitis esse architecto maxime odit velit praesentium, autem eaque tempora veniam est, illo voluptatum totam impedit. Officiis!</p>
                    <Button>{t('Adopt meh!')}</Button>
                </InfoCard>
                <InfoCard>
                    <img src="https://loremflickr.com/400/250" alt="cat" />
                    <h3>Kitty 3</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium cumque ad nostrum, vitae alias voluptatem, vero incidunt officia nihil nobis hic exercitationem dignissimos voluptates sequi molestias quisquam! Odio, saepe? Fuga neque ratione voluptates! Debitis esse architecto maxime odit velit praesentium, autem eaque tempora veniam est, illo voluptatum totam impedit. Officiis!</p>
                    <Button>{t('Adopt meh!')}</Button>
                </InfoCard>
            </InfoList>
        </Wrapper>
    );
}

export default Home;