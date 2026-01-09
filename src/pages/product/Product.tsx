import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type ProductPageType from '../../entities/product/model/ProductPageType'
import { AppContext } from '../../features/app_context/AppContext'
import './ui/Product.css'
import ProductDao from '../../entities/product/api/ProductDao'
import SiteButton from '../../features/buttons/SiteButton'
import ButtonTypes from '../../features/buttons/types/ButtonTypes'
import 'flag-icons/css/flag-icons.min.css';
import ProductCard from '../../entities/product/ui/ProductCard'

export default function Product() {
    const { setBusy, isBusy, active, setActive, showToast, user } = useContext(AppContext)
    const { slug } = useParams<string>()
    const [pageData, setPageData] = useState<ProductPageType | null>(null)
    const [bid, setBid] = useState<number>(0)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [slug]);

    useEffect(() => {
        if (slug) {
            setBusy(true)
            ProductDao
                .getProduct(slug)
                .then(setPageData)
                .catch(err => {
                    setPageData(null)
                    console.error(err)
                })
                .finally(() => setBusy(false))
        }
    }, [slug])

    const placeBid = () => {
        const newActive = {...active}
        if (!user) return
        if (!pageData) return
        if (newActive.items.find(i => i.item.id === pageData?.product.id)) return
        newActive.items.push({
            item: pageData?.product,
            ordered: false,
            received: false,
            finalBid: bid
        })
        setActive(newActive)
        showToast({message: "You have joined an auction"})
    }

    return <div className='product-page'>
        <div className='product-page-content'>
            <div className='product-page-left'>
                <h1>{pageData?.product.name}</h1>
                <div className='product-img'><img src={pageData?.product.imageUrl} alt="" /></div>
                <div className='product-block'>
                    <h1>Description from the seller</h1>
                    <h5 className='product-description'>{pageData?.product.description}</h5>
                </div>
                <div className='product-block'>
                    {pageData?.product.details &&
                        <div>
                            <h1>Details</h1>
                            <div className='product-details'>
                                {Object.entries(pageData.product.details).map(([key, value]) => (
                                    <div className='product-detail'>
                                        <div className='product-detail-key'>{key}</div>
                                        <div className='product-detail-value'>{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                <div className='product-block'></div>
            </div>
            <div className='product-page-right'>
                <div className='product-time-wrap'>
                    <div className='product-time-block'>
                        <div>00</div>
                        <div className='product-time-timing'>DAYS</div>
                    </div>
                    <div className='product-time-separator'></div>
                    <div className='product-time-block'>
                        <div>06</div>
                        <div className='product-time-timing'>HOURS</div>
                    </div>
                    <div className='product-time-separator'></div>
                    <div className='product-time-block'>
                        <div>27</div>
                        <div className='product-time-timing'>MINUTES</div>
                    </div>
                    <div className='product-time-separator'></div>
                    <div className='product-time-block'>
                        <div>13</div>
                        <div className='product-time-timing'>SECONDS</div>
                    </div>
                </div>
                <div className='product-bid-container'>
                    <div className='product-current-bid'>CURRENT BID</div>
                    <div className='product-bid-value'>$ {pageData?.product.bid}</div>
                    <div className='product-bid-btns'>
                        <div className='product-bid-btn' role='button' onClick={() => setBid((pageData?.product.bid ?? 0) + 10)}>$ {(pageData?.product.bid ?? 0) + 10}</div>
                        <div className='product-bid-btn' role='button' onClick={() => setBid((pageData?.product.bid ?? 0) * 2)}>$ {(pageData?.product.bid ?? 0) * 2}</div>
                        <div className='product-bid-btn' role='button' onClick={() => setBid((pageData?.product.bid ?? 0) * 3)}>$ {(pageData?.product.bid ?? 0) * 3}</div>
                    </div>
                    <input type="text" name="bid" id="bid" className="form-control mb-2 form-bid" placeholder={`${(pageData?.product.bid ?? 0) + 10} or up`} value={bid ? bid : ""} onChange={e => setBid(parseInt(e.target.value))} />
                    <div className='product-bid-btns'>
                        <SiteButton text='Place bid' buttonType={ButtonTypes.White} action={() => placeBid()}/>
                        <SiteButton text='Set max bid' buttonType={ButtonTypes.Blue} />
                    </div>
                    <div className='product-bidders-num'>19 other people are watching this object</div>
                    <table className='product-bidders'>
                        {pageData?.product.bidders?.slice().reverse().map(b => (<tr className='product-bidder-row'>
                            <td className='bid-col-1'><span className={`fi fi-${b.flag}`}></span></td>
                            <td className='bid-col-2'><div >{b.name}</div></td>
                            <td className='bid-col-3'><div >{new Date(b.date).toLocaleDateString()}</div></td>
                            <td className='bid-col-4'><div >${b.bid}</div></td>
                        </tr>))}
                    </table>
                </div>
            </div>
        </div>
        <div className='product-page-recommended'>
            <h5>Similar objects</h5>
            <div className="products-container mt-5">
                {pageData?.recommended.sort(() => 0.5 - Math.random()).slice(0, 4).map(product => <ProductCard product={product} key={product.id} />)}
            </div>
        </div>
    </div>
}