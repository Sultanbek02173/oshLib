import './catalog.scss'


export const Catalog = () => {
    return (
        <div className='catalog container'>

<div >
<h1 className='catalog-text1'>Каталоги</h1>
    <div className='catalog-box'>
        <img className='catalog-img1' src={img1} alt="" />
        <div className='catalog-cont1'>
            <div className='catalog-cont2'>
            <h2 className='catalog-text3'>Каталоги</h2>
            <p className='catalog-text4'>Электронные и печатные каталоги содержат
                     широкий выбор книг, научных изданий и цифровых ресурсов.</p>
            </div>
                
            <button className='catalog-btn'>Подробнее</button>    

        </div>
    </div>
</div>

<div >
  <h1 className='catalog-text2'>Электронная библиотека</h1>
    <div className='catalog-box2'>
        <img className='catalog-img2' src={img2} alt="" />
        <div className='catalog-cont3'>
            <div className='catalog-cont4'>
            <h2 className='catalog-text5'>Электронная библиотека</h2>
            <p className='catalog-text6'>Доступ к тысячам электронных книг, научных публикаций и 
            архивных документов в удобном формате.</p>
            </div>
                
            <button className='catalog-btn2'>Подробнее</button>    

        </div>
    </div>
</div>


        </div>
    );
}

 
