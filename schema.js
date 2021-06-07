const graphql = require('graphql') ;
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql ;


const posts = [
    {
        title: 'First post',
        description: 'Content of the first post',
        author: 'Emmanuel'
    },
    {
        title: 'Second post',
        description: 'Content of the second post',
        author: 'Adaobi'
    }
]

const authors = {
    'Emmanuel': {
        name: 'Emmanuel',
        age: 34
    },
    'Adaobi': {
        name: 'Adaobi',
        age: 29
    }
}


const authorType =  new GraphQLObjectType({
    name: 'Author',
    fields: {
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }
    }
})

const postType =  new GraphQLObjectType({
    name: 'Post',
    fields: {
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        author: {
            type: authorType,
            resolve: (source, params) => {
                return authors[source.author]
            }
        }
    }
})

const queryType =  new GraphQLObjectType({
    name: 'Query',
    fields: {
        post: {
            type: postType,
            args: {
                id: { type: GraphQLInt }
        },
        resolve: (source, {id}) => {
            return posts[id]
        }
        },
        posts: {
            type: new GraphQLList(postType),
            resolve: () => {
                return posts
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType
})

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'RootQueryType',
//         fields: {
//         hello: {
//             type: GraphQLString,
//             resolve() {
//             return 'world'
//             }
//         }
//         }
//     })
// })

module.exports = schema