<template>
    <div class="article">

        <h2>{{article.title}}</h2>

        <h4>Writer {{article.creator.username}}</h4>

        <h4>Date: {{article.dateCreated}}</h4>

        <div class="text">
            <h3>{{article.body}}</h3>
        </div>
    </div>
</template>

<script>
export default {
    props: ["article"],
    data() { 
        return {
            paragraphs: []
        }
    },
}
</script>

<style scoped>

.article {
    text-align: center;
    color: #333333;
}

.article .text {
    width: 80%;
    margin: auto;
    text-align: left;
}

h3 {
    word-spacing: 5px;
}

</style>