import Header from "../Components/Header";
import imgSobre1 from './imgs/imgSobre1.jpg';
import imgSobre2 from './imgs/imgSobre2.jpg';
import imgSobre3 from './imgs/imgSobre3.jpg';
import '../styles/sobre.css'
import FooterPetShop from "../Components/Footer";

function sobre(){

    return (
        <div class="base-projeto">
            <Header />
            <div class="temp-div">
                <h1 class="grandeH">Sobre nós</h1>
                <div class="content-sobre-texto">
                    <h1 class="hSobre">Uni Pet Shop</h1>
                    <p class="pSobre">A UniPetShop, é a mais procurada loja de pets da Unibrasil, todos os estudantes e funcionários da empresa, sempre, sem menor via de dúvidas, recomenda à nós a todas as pessoas existentes no planeta Terra inteiro, já recebemos visitas importantes como Donald Trump, e até mesmo o ET Bilu, por isso pode ter certeza que tudo o que o cliente quer, nós temos disponível no precinho para vocês, além de cuidarmos dos pets da melhor forma possível, até mesmo o seu Dinossauro REX no Acre, podemos tosar as escamas dele também se preferir. Confie no nosso atendimento.</p>
                    <h2 class="hSobre">PetShop</h2>
                    <p class="pSobre">Pet shop ou loja de animais é um estabelecimento comercial especializado em vender animais, geralmente filhotes, destinados a serem animais de estimação, bem como alimentos, acessórios e artigos para entusiastas, além de oferecer serviços de embelezamento como banho, tosa e perfumaria.Os principais animais comercializados nesses estabelecimentos são cães, gatos, pássaros e peixes ornamentais. Porém, muitas lojas também trabalham com espécimes exóticos como chinchilas, esquilos, furões, lagartos, cobras e tartarugas.</p>
                    <h2 class="hSobre">Animal de Estimação</h2>
                    <p class="pSobre">Um animal de estimação ,ou mascote, é um animal doméstico selecionado para o convívio com os seres humanos por questões de companheirismo ou divertimento, o que não significa que essa seja a única função dessas espécies na nossa sociedade.</p>
                    <h2 class="hSobre">Funções sociais</h2>
                    <p class="pSobre">Animais de estimação apresentam diversas funções na sociedade humana, sendo frequentemente citados como formas de se trazer conforto, companhia e aumentar a autoestima das pessoas. A psicologia reconhece que os efeitos benéficos do convívio com animais de estimação são diversos, tanto para adultos bem como para crianças com destaque à redução do stress, combate à crises de depressão e aumento do senso de responsabilidade.</p>
                    <p class="pSobre">Estudos envolvendo pessoas que mantém gatos como companhia indicam que existe correlação direta entre a presença desses animais e a melhoria da saúde de seus mantenedores humanos. Observou-se uma redução de 30% no risco de ocorrências de infartos nas pessoas que têm gatos como animais de estimação. O provável motivo é que o convívio com esses pequenos felinos seria capaz de minimizar os níveis de estresse, um dos principais responsáveis pelo surgimento de problemas cardiovasculares.</p>
                </div>
                <hr/>
                <div class="content-sobre-imgs">
                    <div>
                        <h2>Produtos para pets</h2>
                        <img src={imgSobre1}/>
                    </div>
                    <div>
                        <h2>Banho e tosa</h2>
                        <img src={imgSobre2}/>
                    </div>
                    <div>
                        <h2>Ração para pets</h2>
                        <img src={imgSobre3}/>
                    </div>
                </div>
            </div>
            <FooterPetShop />
        </div>
        
    )


}

export default sobre;