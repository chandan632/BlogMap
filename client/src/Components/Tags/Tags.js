import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class Tags extends Component {
    state = {
        tags: [],
        bg: ['primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'dark',
            'primary',
            'success',
            'danger',
            'warning',
            'info',
        ]
    }
    componentDidMount() {
        fetch("http://127.0.0.1:5002/tags", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    tags: [...new Set(res.tags)]
                })
            })
            .catch(err => console.log(err))
        if (this.state.tags.length > 0) {
            this.setState({
                tags: [...new Set(this.state.tags)]
            })
        }
    }

    render() {
        const variantColor = () => {
            return this.state.bg[Math.floor(Math.random() * 10)]
        }

        return (
            <>
                <h3 className="text-center">Tags</h3>

                {
                    this.state.tags.map((tag, index) => <Button key={`tag+${index}`} className="rounded rounded-pill m-1 px-3 text-center" variant={variantColor()}>{tag}</Button>)
                }
            </>
        )
    }
}

export default Tags
