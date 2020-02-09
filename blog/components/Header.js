// 现在我们需要利用useEffect()方法来从接口中获取动态数据。
// 需要先引入useState和useEffect, 然后由于还要进行跳转，所以还要引入Router和Link
// 由于还要访问接口，所以还要引入axios和servicePath
// 引入后用useState声明navArray和使用useEffect()获取远程数据
import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/style/components/header.css'

import { Row, Col, Menu, Icon } from 'antd'
const Header = () => {
    const [navArray, setNavArray] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()


    }, [])

    //跳转到列表页
    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/index')
        } else {
            Router.push('/list?id=' + e.key)
        }


    }
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">技术胖</span>
                    <span className="header-txt">专注前端开发,每年100集免费视频。</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal">
                        <Menu.Item key="0">
                            <Icon type="home" />
                            首页
                    </Menu.Item>
                        {
                            navArray.map((item) => {
                                <Menu.Item key={item.id}>
                                    <Icon type="home" />
                                    {item.title}
                                </Menu.Item>
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header