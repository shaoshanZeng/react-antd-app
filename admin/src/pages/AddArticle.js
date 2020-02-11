import React, { useState } from 'react';

import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker,message } from 'antd'
import marked from 'marked'
const { Option } = Select;
const { TextArea } = Input



function AddArticle() {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([{Id:1,typeName:"类别1"},{Id:2,typeName:"类别2"}]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别
    // marked.setOptions({
    //     renderer: marked.Renderer(),
    //     gfm: true,
    //     pedantic: false,
    //     sanitize: false,
    //     tables: true,
    //     breaks: false,
    //     smartLists: true,
    //     smartypants: false,
    // });
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    const selectTypeHandler =(value)=>{
        console.log(value)
        setSelectType(value)
    }
    // 保存
    const saveArticle = ()=>{
        if(!selectedType){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }
        message.success('检验通过')
        console.log(articleTitle);
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                        <Input 
                            value={articleTitle}
                            placeholder="博客标题" 
                            onChange={e=>{

                            setArticleTitle(e.target.value)
                            }}
                            size="large" />
                            {/* <Input
                                placeholder="博客标题"
                                size="large" /> */}
                        </Col>
                        <Col span={4}>
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                                    })
                                }
                            </Select>
                            {/* <Select defaultValue="Sign Up" size="large">
                                <Option value="Sign Up">视频教程</Option>
                            </Select> */}
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />
                            <div
                                className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }} >

                            </div>
                        </Col>

                    </Row>

                </Col>

                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle} >发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={4}
                                value={introducemd}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                                placeholder="文章简介"
                            />
                            <div
                                className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }} >
                            </div>
                        </Col>

                        <Col span={12}>
                            <div className="date-select">
                            <DatePicker
                                onChange={(date,dateString)=>setShowDate(dateString)} 
                                placeholder="发布日期"
                                size="large"

                            />
                                {/* <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                /> */}
                            </div>
                        </Col>

                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="修改日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle