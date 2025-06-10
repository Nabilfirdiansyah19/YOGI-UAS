const Status = ({ bath, hunger, sleep, happiness, health, money}) => {
    return (
        <>
            <div><img src="/asset/iconBar/coin.png" className="money-picture"/></div>
            <div className="money-displayed">{money}</div>
            <progress value={bath} id="bath" max="100"></progress>
            <progress value={hunger} id="hunger" max="100"></progress>
            <progress value={sleep} id="sleeps" max="100"></progress>
            <progress value={happiness} id="happy" max="100"></progress>
            <progress value={health} id="health" max="100"></progress>
            <div><img src="/asset/iconBar/shower.png" className="bath-picture" alt="Shower" /></div>
            <div><img src="/asset/iconBar/hunger.png" className="hunger-picture" alt="Hunger" /></div>
            <div><img src="/asset/iconBar/bed.png" className="sleeps-picture" alt="Bed" /></div>
            <div><img src="/asset/iconBar/happy.png" className="happy-picture" alt="Happy" /></div>
            <div><img src="/asset/iconBar/health.png" className="health-picture" alt="Health" /></div>
        </>
    )
}

export default Status;