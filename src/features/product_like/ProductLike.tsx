import './ui/ProductLike.css'

export default function ProductLike({likes}: {likes: number}) {
    return <div className='product-like-wrap'>
        <i className="bi bi-heart icon-blue"></i>
        <div>{likes}</div>
    </div>
}